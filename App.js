import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import _ from 'lodash'

import AppContainer from './xnavigation/materialNavigation'
import AppSessions from './src/wrappers/AppSessions'
import AppLoading from './src/wrappers/AppLoading'

import NavigationService from './xnavigation/NavigationService';

function MainApp(props){
  const { navigation, screenProps, } = props

  const navigatorRef = useRef(null)

  return (
    <AppLoading>
      <AppSessions
        navigatorRef={navigatorRef}
        NavigationService={NavigationService}
      >
        <AppContainer
          screenProps={screenProps}
          navigation={navigation}
          ref={navigatorRef}
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