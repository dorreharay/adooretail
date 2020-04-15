import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import _ from 'lodash'

import AppContainer from './xnavigation/materialNavigation'
import AppSessions from './src/wrappers/AppSessions'
import AppLoading from './src/wrappers/AppLoading'

function MainApp(props) {
  const { screenProps, } = props


  return (
    // <AppLoading>
      <AppSessions>
        <AppContainer />
      </AppSessions>
    // </AppLoading>
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