import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
import AnimatedSplash from "react-native-animated-splash-screen";
import BackgroundTimer from 'react-native-background-timer';
import UserInactivity from 'react-native-user-inactivity';
import { TabActions } from '@react-navigation/native';

import { syncSessions, validateSessionRoutine, } from '@requests'
import { deviceWidth, deviceHeight, } from '@dimensions';

import * as NavigationService from '../../xnavigation/NavigationService';

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { setNeedToReenter, } from '@reducers/UserReducer'
import { setOrientationDimensions, setCurrentRoute, } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';
import SessionModal from '../screens/SalesLayout/components/SessionModal/SessionModal';
import PinModal from '../screens/SalesLayout/components/PinModal/PinModal';

function AppSessions(props) {
  const {
    children, navigationRef,
  } = props

  const jumpToAction = TabActions.jumpTo('NoAccount');

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)

  const syncRef = useRef(null)
  const intervalRef = useRef(false)
  const validationRef = useRef(null)

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)
  const modalStatus = useSelector(state => state.temp.modalStatus)
  const currentRoute = useSelector(state => state.temp.currentRoute)
  const initialFlow = useSelector(state => state.user.initialFlow)
  const settings = useSelector(state => state.user.settings)

  const dispatch = useDispatch()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(false)
  const [pinVisible, setPinVisible] = useState(false)

  useEffect(() => {
    if (currentAccount) {
      BackgroundTimer.clearInterval(syncRef.current);
      BackgroundTimer.clearInterval(validationRef.current);

      validateSessionRoutine()

      if (settings.shifts_enabled) {
        validationRef.current = BackgroundTimer.setInterval(() => {
          validateSessionRoutine()
        }, currentAccount && currentAccount.client_data && currentAccount.client_data.shift_validation_period || (30 * 1000));
      }

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
        if (currentSession.endTime || currentAccount.localSessions.length === 0) {
          navigationRef.current.dispatch(TabActions.jumpTo('Login'));
          dispatch(setCurrentRoute(1))

          timerRef1.current = setTimeout(() => {
            setInitialLoadingVisibility(true)
          }, 300)

          return
        }

        navigationRef.current.dispatch(TabActions.jumpTo('SalesLayout'));
        dispatch(setCurrentRoute(4))
        setTimeout(() => {
          setPinVisible(true)
        }, 500)

        syncSessions()

        timerRef1.current = setTimeout(() => {
          setInitialLoadingVisibility(true)
        }, 300)
      } else {
        // navigationRef.current.dispatch(TabActions.jumpTo('NoAccount'));

        dispatch(setCurrentRoute(initialFlow ? 2 : 0))
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
          <UserInactivity
            timeForInactivity={120 * 1000}
            timeoutHandler={BackgroundTimer}
            isActive={!pinVisible}
            onAction={active => {
              if (!active) {
                setPinVisible(true)
              }
            }}
            style={{ width: '100%', height: '100%', }}
          >
            <View style={{ width: '100%', height: '100%', zIndex: 10, }}>
              <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Beta Build {buildInfo.version} ({buildInfo.buildNumber})</Text>
              </View>
              {withProps}

            </View></UserInactivity>
        </SharedBackground>

        {currentAccount && (
          <>
            <SessionModal
              isVisible={modalStatus !== ''}
              intervalRef={intervalRef}
              NavigationService={NavigationService}
              gotoInputCash={() => navigationRef.current.dispatch(TabActions.jumpTo('InputCash'))}
            />
            <PinModal isVisible={pinVisible} setVisible={setPinVisible} />
          </>
        )}
      </AnimatedSplash>
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
