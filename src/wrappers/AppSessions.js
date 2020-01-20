import React, { useRef, useState, useEffect, } from 'react'
import { View, Text, Dimensions, StyleSheet, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info';

import API from '../../rest/api'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { PROBA_LIGHT } from '@fonts'
import { syncDataWithStore } from '@reducers/UserReducer'
import { setOrientationDimensions, } from '@reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';

function AppSessions(props) {
  const {
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity,
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const syncRef = useRef(null)
  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()

  const [buildInfo, setBuildInfo] = useState({ version: '', buildNumber: '', })

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
        shift_start: data.shift_start.shift_start,
        shift_end: data.shift_end.shift_end,
        default_shift_end: data.shift_end.shift_end,
        businessName: data.business_name.business_name,
        registeredDeviceIds: data.registered_device_ids.registered_device_ids,
        employees: data.employees.employees,
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
  }, [currentAccount])

  const gotoScreen = (screen) => {
    setTimeout(() => {
      NavigationService.setTopLevelNavigator(navigatorRef.current)
      setTimeout(() => {
        NavigationService.navigate(screen)
        setTimeout(() => {
          changeInitialLoadingWrapperOpacity(false)
          SplashScreen.hide();
        }, 250)
      }, 110)
    }, 100)
  }

  useEffect(() => {
    if (initialLoadingVisibility) {
      if (accounts.length === 0) {
        gotoScreen('NoAccount')

        return
      }

      if (!currentSession.endTime && currentSession.length !== 0) {
        gotoScreen('SalesLayout')
      } else {
        changeInitialLoadingWrapperOpacity(false)
        SplashScreen.hide();
      }
    }
  }, [
      navigatorRef, currentSession, accounts,
      initialLoadingVisibility, currentAccount
    ])

  const onOrientationChange = (orientation) => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToLandscape()
    }
  }

  useEffect(() => {
    Orientation.getOrientation((err, orientation) => {

      if (orientation === 'PORTRAIT') {
        Orientation.lockToLandscape()
      } else {
        let deviceWidth = Dimensions.get('screen').width
        let deviceHeight = Dimensions.get('screen').height

        dispatch(setOrientationDimensions({ deviceWidth, deviceHeight }))
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
