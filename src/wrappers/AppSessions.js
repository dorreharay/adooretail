import React, { useRef, useState, useEffect, } from 'react'
import { View, Dimensions } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'

import { currentSessionSelector } from '@selectors'
import { setForceSlide, setEndOfSessionStatus, setOrientationDimensions, } from '../../reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';

function AppSessions(props) {
  const {
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity,
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const accounts = useSelector(state => state.user.accounts)

  const dispatch = useDispatch()

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
        gotoScreen('ControlLayout')
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

  const screenProps = {
    initialLoadingVisibility,
    initialLoadingOpacity,
    changeInitialLoadingWrapperOpacity,
  }

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, { screenProps, })
  );

  return (
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
          {withProps}
        </View>
      </SharedBackground>
    </SharedBackground>
  )
}

export default AppSessions
