import React, { useState, useEffect, useRef, } from 'react'
import { StatusBar, Animated, View, Text, Alert } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash'

import AppContainer from './xnavigation/materialNavigation'
import NavigationService from './xnavigation/NavigationService';

function MainApp() {  
  const { initialLoading, currentSession, } = useSelector(state => ({ initialLoading: state.user.initialLoading, currentSession: state.user.currentSession }))

  const navigatorRef = useRef()

  useEffect(() => {
    if(initialLoading) {
      if(!_.isEmpty(currentSession)) {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('SalesLayout')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
            }, 50)
          }, 110)
        }, 100)
      } else {
        changeInitialLoadingWrapperOpacity(false)
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
        ref={navigatorRef}
      />
      {initialLoadingVisibility && (
        <Animated.View style={{ alignItems: 'center', justifyContent: 'center', opacity: initialLoadingOpacity, width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', backgroundColor: '#2C2C2E', zIndex: 110 }}>
          <View style={{ width: 200, marginBottom: 80, }}>
            <Text style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'futura_light' }}>Синхронізація..</Text>
          </View>
        </Animated.View>
      )}
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