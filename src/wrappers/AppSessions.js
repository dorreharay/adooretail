import React, { useRef, useState, useEffect, } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'

import { currentSessionSelector } from '@selectors'
import { setForceSlide, setEndOfSessionStatus } from '../../reducers/TempReducer'

import SharedBackground from '@shared/SharedBackground';

function AppSessions(props){
  const { 
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity, 
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const dispatch = useDispatch()

  const currentSession = useSelector(currentSessionSelector)

  const currentAccount = useSelector(state => state.user.currentAccount)

  useEffect(() => {
    if(initialLoadingVisibility) {
      console.log('initialLoadingOpacity', initialLoadingOpacity)

      if(_.isEmpty(currentAccount)) {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('NoAccount')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
              SplashScreen.hide();
            }, 350)
          }, 110)
        }, 100)

        return
      }

      if(currentSession.endTime) {
        // dispatch(setEndOfSessionStatus(false))
        setTimeout(() => {
          if(initialLoadingVisibility) {
            changeInitialLoadingWrapperOpacity(false)
            SplashScreen.hide();
          }
        }, 300)
      } else {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('SalesLayout')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
              SplashScreen.hide();
            }, 250)
          }, 110)
        }, 100)
      }
    }
  }, [navigatorRef, currentSession, initialLoadingVisibility, currentAccount])

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
      source={require('@images/background-adv3.png')}
      mainWrapper
    >
      <SharedBackground
        loading={initialLoadingVisibility}
        opacity={initialLoadingOpacity}
        source={require('@images/background-adv3.png')}
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
