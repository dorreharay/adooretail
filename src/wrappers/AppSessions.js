import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
// import Orientation from 'react-native-orientation';

import { syncSessions, } from '@requests'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { setOrientationDimensions, setCurrentRoute, setModalStatus } from '@reducers/TempReducer'

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
  const modalStatus = useSelector(state => state.temp.modalStatus)
  const currentRoute = useSelector(state => state.temp.currentRoute)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()
  const netInfo = useNetInfo()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [prevNetState, setPrevNetState] = useState(false)

  useEffect(() => {
    if (currentAccount) {
      if (currentAccount.needToReenter) {
        NavigationService.setTopLevelNavigator(navigatorRef.current)
        NavigationService.navigate('Login')
      }
    }
  }, [currentAccount])

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
      if (modalStatus !== '') {
        clearInterval(syncRef.current)

        syncRef.current = setInterval(() => {
          synchronizeSessions()
        }, 5000)
      } else {
        clearInterval(syncRef.current)

        syncRef.current = setInterval(() => {
          synchronizeSessions()
        }, (currentAccount.client_data.update_period ? currentAccount.client_data.update_period : (10 * 1000)))
      }
    }

    return () => {
      clearInterval(syncRef.current)
    };
  }, [accounts, currentAccount, modalStatus, currentSession, currentRoute, netInfo])

  const gotoScreen = async (screen, callback) => {
    timerRef1.current = setTimeout(() => {
      NavigationService.setTopLevelNavigator(navigatorRef.current)
      timerRef2.current = setTimeout(async () => {
        NavigationService.navigate(screen)

        try {
          await synchronizeSessions()
        } catch (error) {
          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();
        }

        Orientation.lockToLandscape();

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

  useEffect(() => {
    if (initialLoadingVisibility) {
      if (accounts.length === 0) {
        gotoScreen('NoAccount', () => dispatch(setCurrentRoute(0)))

        return
      }

      if (!currentSession.endTime && currentSession.length !== 0) {
        if (currentAccount.needToReenter) {
          Orientation.lockToLandscape();

          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();

          return
        }

        gotoScreen('SalesLayout', () => dispatch(setCurrentRoute(4)))
      } else {
        synchronizeSessions()
      }
    }
  }, [])

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
