import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
let moment = require('moment-timezone');
moment.locale('uk');


import API from '../../rest/api'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { START, END, NO_TIME } from '@statuses'
import { syncDataWithStore } from '@reducers/UserReducer'
import { setOrientationDimensions, } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';
import SessionModal from '../screens/SalesLayout/components/SessionModal/SessionModal';

function AppSessions(props) {
  const {
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity,
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const syncRef = useRef(null)
  const intervalRef = useRef(false)

  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const currentAccountToken = useSelector(state => state.user.currentAccountToken)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()
  const netInfo = useNetInfo()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [modalStatus, setModalStatus] = useState('')
  const [currentRoute, setCurrentRoute] = useState(false)
  const [prevNetState, setPrevNetState] = useState(false)

  const getPreparedSessions = () => {
    let offset = 0

    if (currentAccount.localSessions.length >= 5) {
      offset = currentAccount.localSessions.length - 5
    }

    return currentAccount.localSessions.slice(offset, currentAccount.localSessions.length)
  }

  const synchronizeSessions = async () => {
    try {
      const data = await API.synchronizeSessions({
        localSessions: getPreparedSessions(),
      })

      const payload = {
        shift_start: data.shift_start,
        shift_end: data.shift_end,
        default_shift_end: data.shift_end,
        businessName: data.business_name,
        registeredDeviceIds: data.registered_device_ids,
        employees: data.employees,
        // products: data.products.products,
      }

      dispatch(syncDataWithStore(payload))
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    syncRef.current = setInterval(() => {
      synchronizeSessions()
    }, 30 * 1000)
    return () => {
      clearInterval(syncRef.current)
    };
  }, [currentSession,])

  const netCheck = () => {
    if(!prevNetState) return

    if(!prevNetState.isConnected && netInfo.isConnected) {
      clearInterval(syncRef.current)

      syncRef.current = setInterval(() => {
        synchronizeSessions()
      }, 30 * 1000)
    }

    if(prevNetState.isConnected && !netInfo.isConnected) {
      clearInterval(syncRef.current)
    }

    setPrevNetState(netInfo)
  }

  useEffect(() => netCheck(), [netInfo])

  const asyncSync = async () => {
    await synchronizeSessions()
    changeInitialLoadingWrapperOpacity(false)
    SplashScreen.hide();
  };

  const gotoScreen = async (screen, callback) => {
    setTimeout(() => {
      NavigationService.setTopLevelNavigator(navigatorRef.current)
      setTimeout(async () => {
        NavigationService.navigate(screen)

        await asyncSync()

        callback()
      }, 110)
    }, 100)
  }

  const peek = () => {
    if (initialLoadingVisibility) {
      if (accounts.length === 0) {
        gotoScreen('NoAccount', () => setCurrentRoute(0))

        return
      }

      if (!currentSession.endTime && currentSession.length !== 0) {
        gotoScreen('SalesLayout', () => setCurrentRoute(4))
      } else {
        changeInitialLoadingWrapperOpacity(false)
        SplashScreen.hide();
      }
    }
  }

  useEffect(peek, [currentSession])

  const saveDimensions = () => {
    let deviceWidth = Dimensions.get('screen').width
    let deviceHeight = Dimensions.get('screen').height

    dispatch(setOrientationDimensions({ deviceWidth, deviceHeight }))
  }

  const onOrientationChange = (orientation) => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToLandscape()
      saveDimensions()
    }
  }

  useEffect(() => {
    Orientation.getOrientation((err, orientation) => {

      if (orientation === 'PORTRAIT') {
        Orientation.lockToLandscape()

        saveDimensions()
      } else {
        saveDimensions()
      }
    });

    onOrientationChange()
    Orientation.addOrientationListener(onOrientationChange);

    return () => Orientation.removeOrientationListener(onOrientationChange);
  }, [])

  const getBuildInfo = async () => {
    const version = await DeviceInfo.getVersion()
    const buildNumber = await DeviceInfo.getBuildNumber()

    setBuildInfo({ version, buildNumber, })

    return () => { }
  }

  useEffect(() => {
    getBuildInfo()
  }, [])

  // useEffect(() => {
  //   if (NavigationService.state && NavigationService.state.routeName !== 'SalesLayout') {
  //     return
  //   }

  //   validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_end)

  //   clearInterval(intervalRef.current)

  //   intervalRef.current = setInterval(() => {
  //     validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_end), 5 * 1000
  //   })

  //   return () => {
  //     clearInterval(intervalRef.current)
  //   }
  // }, [currentAccount.shift_end, NavigationService])

  useEffect(() => {
    if (!currentRoute || currentRoute !== 4) {
      return
    }

    console.log('Validation started')

    validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_end)

    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_end), 5 * 1000
    })

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [currentAccount.shift_end, currentRoute])

  function validateSessionRoutine(localSessions, shiftEnd) {
    const isValid = validateSession(localSessions, shiftEnd)

    if (isValid && modalStatus !== '') {
      setModalStatus('')
    }

    if (!isValid) {
      if (localSessions.length === 0) {
        setModalStatus(START)
      } else {
        setModalStatus(END)
      }
    }
  }

  const validateSession = (sessions, shiftEnd) => {
    if (sessions.length === 0) return false

    const currentAccountSession = sessions[sessions.length - 1]

    const sessionStartTime = moment(currentAccountSession.startTime)
    const startOfShift = moment()
      .hour(currentAccountSession.shift_start.hours)
      .minutes(currentAccountSession.shift_start.minutes)
      .seconds(0)
      .format('YYYY-MM-DD HH:mm')
    const endOfShift = moment()
      .hour(shiftEnd.hours)
      .minutes(shiftEnd.minutes)
      .seconds(0)
      .format('YYYY-MM-DD HH:mm')

    const isValid = sessionStartTime.isBetween(startOfShift, endOfShift) && moment().isBetween(startOfShift, endOfShift)

    return isValid
  }

  const screenProps = {
    initialLoadingVisibility,
    initialLoadingOpacity,
    changeInitialLoadingWrapperOpacity,
    setCurrentRoute,
  }

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, { screenProps, })
  );

  return (
    <>
      <SharedBackground
        loading={initialLoadingVisibility}
        opacity={initialLoadingOpacity}
        source={require('@images/background-adv7.png')}
        mainWrapper
      >
        <SharedBackground
          loading={initialLoadingVisibility}
          opacity={initialLoadingOpacity}
          source={require('@images/background-adv7.png')}
          navigation={NavigationService}
        >
          <View style={{ width: '100%', height: '100%', zIndex: 10 }}>
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Beta Build {buildInfo.version} ({buildInfo.buildNumber})</Text>
            </View>
            {withProps}
          </View>
        </SharedBackground>

        <SessionModal
          navigation={NavigationService}
          isVisible={modalStatus !== ''}
          intervalRef={intervalRef}
          openChangeAccountOverview={() => { }}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      </SharedBackground>
    </>
  )
}

const styles = StyleSheet.create({
  versionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1000,
  },
  versionText: {
    color: '#222222',
    fontSize: 15,
    fontFamily: PROBA_LIGHT,
  },
})

export default AppSessions
