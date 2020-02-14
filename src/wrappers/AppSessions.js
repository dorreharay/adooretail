import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';

import API from '@api'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { START, END, NO_TIME } from '@statuses'
import { getFormattedDate, getStartOfPeriod, getEndOfPeriod, getIsBetween, } from '@dateFormatter'
import { syncDataWithStore } from '@reducers/UserReducer'
import { setOrientationDimensions, setCurrentRoute } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';
import SessionModal from '../screens/SalesLayout/components/SessionModal/SessionModal';

function AppSessions(props) {
  const {
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity,
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)

  const syncRef = useRef(null)
  const intervalRef = useRef(false)

  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const currentAccountToken = useSelector(state => state.user.currentAccountToken)
  const currentRoute = useSelector(state => state.temp.currentRoute)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()
  const netInfo = useNetInfo()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [modalStatus, setModalStatus] = useState('')
  const [prevNetState, setPrevNetState] = useState(false)

  const getPreparedSessions = () => {
    let offset = 0

    if (currentAccount.localSessions.length >= 5) {
      offset = currentAccount.localSessions.length - 5
    }

    return currentAccount.localSessions.slice(offset, currentAccount.localSessions.length)
  }
  
  useEffect(() => {
    return () => {
      dispatch(setCurrentRoute(0))
    }
  }, [])

  const synchronizeSessions = async () => {
    try {
      // if(!netInfo.isConnected) {
      //   throw new Error('no internet')
      // }

      const data = await API.synchronizeSessions({
        localSessions: getPreparedSessions(),
        newSettings: currentAccount.settings,
      }, currentAccountToken)

      const payload = {
        ...data,
      }

      dispatch(syncDataWithStore(payload, data.shift_start, data.shift_end))

      if (currentRoute && currentRoute === 4) {
        // Alert.alert(`${currentRoute} ---- 1`)

        if (accounts.length !== 0) {
          validateSessionRoutine(currentAccount.localSessions, data.shift_start, data.shift_end)
        }
      }
    } catch (error) {
      console.log('error', error)

      if (initialLoadingVisibility) {
        changeInitialLoadingWrapperOpacity(false)
        SplashScreen.hide();
      }

      if (currentRoute && currentRoute === 4) {
        if (accounts.length !== 0) {
          // Alert.alert(`${currentRoute} ---- 2`)

          validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_start, currentAccount.shift_end)
        }
      }
    }
  }

  useEffect(() => {
    if (currentRoute && currentRoute === 4) {
      if (!initialLoadingVisibility) {
        if (accounts.length !== 0) {
          validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_start, currentAccount.shift_end)
        }
      }
    }
  }, [currentAccount, currentRoute, initialLoadingVisibility])

  useEffect(() => {
    if (accounts.length !== 0) {
      clearInterval(syncRef.current)

      syncRef.current = setInterval(() => {
        synchronizeSessions()
      }, 10 * 1000)
    }


    return () => {
      clearInterval(syncRef.current)
    };
  }, [accounts, currentAccount, currentSession, currentRoute, netInfo])

  const asyncSync = async () => {
    if (accounts.length !== 0) {
      await synchronizeSessions()

      changeInitialLoadingWrapperOpacity(false)
      SplashScreen.hide();
    }
  };

  const gotoScreen = async (screen, callback) => {
    timerRef1.current = setTimeout(() => {
      NavigationService.setTopLevelNavigator(navigatorRef.current)
      timerRef2.current = setTimeout(async () => {
        NavigationService.navigate(screen)

        await asyncSync()

        changeInitialLoadingWrapperOpacity(false)
        SplashScreen.hide();

        callback()
      }, 110)
    }, 100)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
    }
  }, [])

  const peek = () => {
    if (initialLoadingVisibility) {
      if (accounts.length === 0) {
        gotoScreen('NoAccount', () => dispatch(setCurrentRoute(0)))

        return
      }

      if (!currentSession.endTime && currentSession.length !== 0) {
        gotoScreen('SalesLayout', () => dispatch(setCurrentRoute(4)))
      } else {
        asyncSync()
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

  useEffect(() => {
    if (currentRoute && currentRoute === 4) {
      clearInterval(intervalRef.current)

      // intervalRef.current = setInterval(() => {
      //   validateSessionRoutine(currentAccount.localSessions, currentAccount.shift_start, currentAccount.shift_end)
      // }, 2 * 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [currentAccount, currentRoute, modalStatus,])

  function validateSessionRoutine(localSessions, shiftStart, shiftEnd) {
    const isValid = validateSession(localSessions, shiftStart, shiftEnd)

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

  const validateSession = (sessions, shiftStart, shiftEnd) => {
    if (sessions.length === 0) return false

    const currentAccountSession = sessions[sessions.length - 1]

    let startOfShift = ''
    let endOfShift = ''

    

    if (currentAccount.settings.shifts.enabled) {
      startOfShift = getFormattedDate('YYYY-MM-DD HH:mm', { hours: shiftStart.hours, minutes: shiftStart.minutes, seconds: 0, })
      endOfShift = getFormattedDate('YYYY-MM-DD HH:mm', { hours: shiftEnd.hours, minutes: shiftEnd.minutes, seconds: 0, })
    } else {
      startOfShift = getStartOfPeriod('YYYY-MM-DD HH:mm', 'day')
      endOfShift = getEndOfPeriod('YYYY-MM-DD HH:mm', 'day')
    }

    console.log('Shift validation')
    console.log('%c%s', 'color: #E7715E; font: 0.8rem Tahoma;', `${getFormattedDate('HH:mm', startOfShift)}  ------>  ${getFormattedDate('HH:mm', endOfShift)}`)
    
    const isValid = getIsBetween(currentAccountSession.startTime, startOfShift, endOfShift) && getIsBetween(null, startOfShift, endOfShift)

    return isValid
  }

  const screenProps = {
    initialLoadingVisibility,
    initialLoadingOpacity,
    changeInitialLoadingWrapperOpacity,
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

        {accounts.length !== 0 && (
          <SessionModal
            isVisible={modalStatus !== ''}
            intervalRef={intervalRef}
            navigatorRef={navigatorRef}
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        )}

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
