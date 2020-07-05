import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import _ from 'lodash'

import AppContainer from './navigation'
import AppSessions from './src/wrappers/AppSessions'
import AppDevices from './src/wrappers/AppDevices'

function MainApp(props) {
  const { screenProps, } = props


  return (
    <AppContainer />
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