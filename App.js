import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash'

import { FUTURA_LIGHT } from '@fonts';

import AppContainer from './xnavigation/materialNavigation'
import NavigationService from './xnavigation/NavigationService';
import { setCurrentSession } from './reducers/UserReducer'

function MainApp({navigation}) {  
  const { initialLoading, currentSession, } = useSelector(state => ({ initialLoading: state.user.initialLoading, currentSession: state.user.currentSession }))

  const navigatorRef = useRef()

  const currentAccount = useSelector(state => state.user.currentAccount)

  const [forceSlide, setForceSlide] = useState(false)

  useEffect(() => {
    if(initialLoading) {
      if(!_.isEmpty(currentSession)) {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('SalesLayout')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
            }, 200)
          }, 110)
        }, 100)
      } else {
        if(!_.isEmpty(currentAccount)) {
          setForceSlide(1)
        }
      }
    }
  }, [navigatorRef, initialLoading, currentSession])

  const [initialLoadingOpacity] = useState(new Animated.Value(1))
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(true)

  const dispatch = useDispatch()

  const changeInitialLoadingWrapperOpacity = (visible) => {
    Animated.timing(
      initialLoadingOpacity,
      {
        toValue: visible ? 1 : 0,
        duration: 800,
        useNativeDriver: true,
      },
    ).start()
    setTimeout(() => setInitialLoadingVisibility(false), 800)
  }

  return (
    <>
      <AppContainer
        screenProps={{
          initialLoadingVisibility,
          initialLoadingOpacity,
          forceSlide,
          changeInitialLoadingWrapperOpacity,
        }}
        navigation={navigation}
        ref={navigatorRef}
      />     
      <StatusBar hidden />
    </>
  )
}

export const App = () => (
  <MenuProvider>
    <MainApp />
  </MenuProvider>
);

export default App

console.disableYellowBox = true; 