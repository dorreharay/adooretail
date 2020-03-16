import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
import UserInactivity from 'react-native-user-inactivity';
import BackgroundTimer from 'react-native-user-inactivity/lib/BackgroundTimer';

import { syncSessions, validateSessionRoutine, } from '@requests'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { setNeedToReenter, } from '@reducers/UserReducer'
import { setOrientationDimensions, setCurrentRoute, } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';
import SessionModal from '../screens/SalesLayout/components/SessionModal/SessionModal';

function AppSessions(props) {
  const {
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity = () => {},
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)

  const syncRef = useRef(null)
  const intervalRef = useRef(false)
  const validationRef = useRef(null)

  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const modalStatus = useSelector(state => state.temp.modalStatus)
  const currentRoute = useSelector(state => state.temp.currentRoute)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()
  const netInfo = useNetInfo()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [prevNetState, setPrevNetState] = useState(false)

  // useEffect(() => {
  //   if (currentAccount) {
  //     if (currentAccount.needToReenter) {
  //       NavigationService.setTopLevelNavigator(navigatorRef.current)
  //       NavigationService.navigate('Login')
  //     }
  //   }
  // }, [currentAccount])

  const synchronizeSessions = async () => {
    if (accounts.length !== 0) {
      await syncSessions(() => {
        changeInitialLoadingWrapperOpacity(false)
        SplashScreen.hide();
      })
    }
  }

  useEffect(() => {
    if (accounts.length !== 0) {
      validationRef.current = setInterval(() => {
        validateSessionRoutine()
      }, (currentAccount && currentAccount.client_data && currentAccount.client_data.shift_validation_period || (30 * 1000)))

      clearInterval(syncRef.current)

      syncRef.current = setInterval(() => {
        synchronizeSessions()
      }, (currentAccount && currentAccount.client_data && currentAccount.client_data.update_period || (10 * 1000)))
    }

    return () => {
      clearInterval(syncRef.current)
      clearInterval(validationRef.current)
    };
  }, [accounts, currentAccount, modalStatus, currentSession, currentRoute, netInfo])

  const gotoScreen = async (screen, callback) => {
    timerRef1.current = setTimeout(() => {
      NavigationService.setTopLevelNavigator(navigatorRef.current)
      timerRef2.current = setTimeout(async () => {
        NavigationService.navigate(screen)

        if (accounts.length === 0) {
          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();
        }

        try {
          await synchronizeSessions()
        } catch (error) {
          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();
        }

        // Orientation.lockToLandscapeLeft();

        callback()
      }, 310)
    }, 300)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
    }
  }, [])

  useEffect(() => {
    if (initialLoadingVisibility) {
      if (accounts.length === 0) {
        gotoScreen('NoAccount', () => dispatch(setCurrentRoute(0)))

        return
      }

      if (!currentSession.endTime && currentSession.length !== 0) {
        if (currentAccount.needToReenter) {
          // Orientation.lockToLandscapeLeft();

          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();

          return
        }

        gotoScreen('SalesLayout', () => dispatch(setCurrentRoute(4)))
      } else {
        synchronizeSessions()
      }
    }
  }, [accounts])

  const saveDimensions = () => {
    let deviceWidth = Dimensions.get('screen').width
    let deviceHeight = Dimensions.get('screen').height

    dispatch(setOrientationDimensions({ deviceWidth, deviceHeight }))
  }

  const onOrientationChange = (orientation) => {
    if (orientation === 'PORTRAIT') {
      // Orientation.lockToLandscapeLeft()
      saveDimensions()
    }
  }

  useEffect(() => {
    Orientation.getOrientation((err, orientation) => {

      if (orientation === 'PORTRAIT') {
        // Orientation.lockToLandscapeLeft()
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
    clearInterval(intervalRef.current)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [currentAccount, currentRoute, modalStatus,])

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
      {/* <UserInactivity
        timeForInactivity={currentAccount && currentAccount.client_data && currentAccount.client_data.allowed_inactivity_period || (30 * 1000)}
        timeoutHandler={BackgroundTimer}
        onAction={active => {
          if (!active) {
            if (accounts.length !== 0) {
              dispatch(setNeedToReenter(true))
              NavigationService.setTopLevelNavigator(navigatorRef.current)
              NavigationService.navigate('Login')
            }
          }
        }}
        style={{ flex: 1, }}
      > */}
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
          <View style={{ width: '100%', height: '100%', zIndex: 10, }}>
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
          />
        )}
      </SharedBackground>
      {/* </UserInactivity> */}

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
