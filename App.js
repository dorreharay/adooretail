import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import _ from 'lodash'
import { useDispatch } from 'react-redux';

import AppContainer from './xnavigation/materialNavigation'
import AppSessions from './src/wrappers/AppSessions'
import AppLoading from './src/wrappers/AppLoading'

import NavigationService from './xnavigation/NavigationService';

import { setCurrentRoute } from '@reducers/TempReducer'

function MainApp(props) {
  const { navigation, screenProps, } = props

  const navigatorRef = useRef(null)

  const dispatch = useDispatch()

  return (
    <AppLoading>
      <AppSessions
        navigatorRef={navigatorRef}
        NavigationService={NavigationService}
      >
        <AppContainer
          ref={navigatorRef}
          navigation={navigation}
          screenProps={screenProps}
          onNavigationStateChange={(prev, state) => {
            // dispatch(setCurrentRoute(state.index))
          }}
        />
      </AppSessions>
    </AppLoading>
  )
}

export const App = () => (
  <>
    <MainApp />
    <StatusBar hidden />
  </>
);

export default App

console.disableYellowBox = true; 