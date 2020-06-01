import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
import AnimatedSplash from "react-native-animated-splash-screen";
import BackgroundTimer from 'react-native-background-timer';
import { useNavigation } from '@react-navigation/native';
import { TabActions } from '@react-navigation/native';

import { syncSessions, validateSessionRoutine, } from '@requests'

import * as NavigationService from '../../xnavigation/NavigationService';

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { setNeedToReenter, } from '@reducers/UserReducer'
import { setOrientationDimensions, setCurrentRoute, } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';
import SessionModal from '../screens/SalesLayout/components/SessionModal/SessionModal';

function AppSessions(props) {
  const {
    children, navigationRef,
  } = props

  const jumpToAction = TabActions.jumpTo('NoAccount');

  useEffect(() => {
    console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->', navigationRef.current)
    // navigationRef.current.dispatch(TabActions.jumpTo('NoAccount'))
  }, [navigationRef])

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)

  const syncRef = useRef(null)
  const intervalRef = useRef(false)
  const validationRef = useRef(null)

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)
  const modalStatus = useSelector(state => state.temp.modalStatus)
  const currentRoute = useSelector(state => state.temp.currentRoute)

  const dispatch = useDispatch()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(false)

  useEffect(() => {
    if (currentAccount) {
      BackgroundTimer.clearInterval(syncRef.current);
      BackgroundTimer.clearInterval(validationRef.current);

      validationRef.current = BackgroundTimer.setInterval(() => {
        validateSessionRoutine()
      }, currentAccount && currentAccount.client_data && currentAccount.client_data.shift_validation_period || (30 * 1000));

      BackgroundTimer.clearInterval(syncRef.current);

      syncRef.current = BackgroundTimer.setInterval(() => {
        syncSessions()
      }, currentAccount && currentAccount.client_data && currentAccount.client_data.update_period || (30 * 1000));
    }

    return () => {
      BackgroundTimer.clearInterval(syncRef.current);
      BackgroundTimer.clearInterval(validationRef.current);
    };
  }, [currentAccount])

  const delay = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }
  

  useEffect(() => {
    delay(500).then(() => {
      if (currentAccount) {
        if (!currentSession.endTime && currentSession.length === 0) {
          navigationRef.current.dispatch(TabActions.jumpTo('Login'));
          dispatch(setCurrentRoute(1))

          timerRef1.current = setTimeout(() => {
            setInitialLoadingVisibility(true)
          }, 300)

          return
        }

        navigationRef.current.dispatch(TabActions.jumpTo('SalesLayout'));
        dispatch(setCurrentRoute(4))

        syncSessions()

        timerRef1.current = setTimeout(() => {
          setInitialLoadingVisibility(true)
        }, 1000)
      } else {
        // navigationRef.current.dispatch(TabActions.jumpTo('NoAccount'));

        dispatch(setCurrentRoute(0))
        timerRef1.current = setTimeout(() => {
          setInitialLoadingVisibility(true)
        }, 200)
      }
    })
  }, [])

  const gotoScreen = async (screen) => {
    TabActions.jumpTo(screen)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
    }
  }, [])

  useEffect(() => {
    clearInterval(intervalRef.current)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [currentAccount, currentRoute, modalStatus,])

  useEffect(() => {
    getBuildInfo()
  }, [])

  const getBuildInfo = async () => {
    const version = await DeviceInfo.getVersion()
    const buildNumber = await DeviceInfo.getBuildNumber()

    setBuildInfo({ version, buildNumber, })

    return () => { }
  }

  const screenProps = {
    initialLoadingVisibility,
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
              NavigationService.jumpTo('Login')
            }
          }
        }}
        style={{ flex: 1, }}
      > */}

      <AnimatedSplash
        isLoaded={initialLoadingVisibility}
        logoImage={require("@images/splash_logo.png")}
        backgroundColor={"#FFFFFF"}
        logoHeight={250}
        logoWidth={250}
      >
        <SharedBackground
          image={0}
          navigation={null}
        >
          <View style={{ width: '100%', height: '100%', zIndex: 10, }}>
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Beta Build {buildInfo.version} ({buildInfo.buildNumber})</Text>
            </View>
            {withProps}
          </View>
        </SharedBackground>

        {/* {accounts.length !== 0 && (
          <SessionModal
            isVisible={modalStatus !== ''}
            intervalRef={intervalRef}
            NavigationService={NavigationService}
          />
        )} */}
      </AnimatedSplash>
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
