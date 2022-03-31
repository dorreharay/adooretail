import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import DeviceInfo from 'react-native-device-info';
import AnimatedSplash from "react-native-animated-splash-screen";
import BackgroundTimer from 'react-native-background-timer';
import { TabActions } from '@react-navigation/native';

import { syncSessions, validateSessionRoutine, } from '@helpers'

import { GILROY_LIGHT } from '@fonts'

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

  const account = useSelector(state => state.user.account)
  const modalStatus = useSelector(state => state.temp.modalStatus)
  const currentRoute = useSelector(state => state.temp.currentRoute)
  const settings = useSelector(state => state.user.settings)

  const dispatch = useDispatch()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(false)
  const [pinVisible, setPinVisible] = useState(false)

  useEffect(() => {
    if (account) {
      BackgroundTimer.clearInterval(syncRef.current);

      syncRef.current = BackgroundTimer.setInterval(() => {
        syncSessions()
      }, account && account?.sync_data && account?.sync_data?.update_period || (30 * 1000));
    }

    return () => {
      BackgroundTimer.clearInterval(syncRef.current);
      BackgroundTimer.clearInterval(validationRef.current);
    };
  }, [account])

  useEffect(() => {
    BackgroundTimer.setTimeout(() => {
      setInitialLoadingVisibility(true)
    }, 500)
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
  }, [account, currentRoute, modalStatus,])

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
        logoImage={require("@images/logo-heading.png")}
        backgroundColor={"#FFFFFF"}
        logoHeight={100}
        logoWidth={100}
      >
        <View style={{ width: '100%', height: '100%', zIndex: 10, backgroundColor: '#FAFAFA' }}>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Beta Build {buildInfo.version} ({buildInfo.buildNumber})</Text>
          </View>
          {withProps}
        </View>
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
    fontFamily: GILROY_LIGHT,
  },
})

export default AppSessions
