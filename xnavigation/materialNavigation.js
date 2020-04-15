import React, { useRef, } from 'react'
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NoAccount from '../src/screens/InitialLayout/NoAccount/NoAccount'
import Login from '../src/screens/InitialLayout/Login/Login'
import InputCash from '../src/screens/InitialLayout/InputCash/InputCash';
import InputEmployees from '../src/screens/InitialLayout/InputEmployees/InputEmployees';
import SalesLayout from '../src/screens/SalesLayout/SalesLayout'
import ControlLayout from '../src/screens/ControlLayout/NewControlLayout'

import { setCurrentRoute } from '@reducers/TempReducer'

import { navigationRef } from './NavigationService'

const Tab = createMaterialTopTabNavigator();

function AppContainer() {
  const dispatch = useDispatch()

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        if(Platform.OS === 'android') {
          // dispatch(setCurrentRoute(state.index))
        }
      }}
    >
      <Tab.Navigator
        initialRouteName='Login'
        screenOptions={{}}
        backBehavior='none'
        swipeEnabled={false}
        tabBar={() => null}
        lazy={true}
        removeClippedSubviews={Platform.OS === 'android'}
        sceneContainerStyle={{
          backgroundColor: '#FFFFFF00'
        }}
        style={{
          backgroundColor: '#FFFFFF00'
        }}
      >
        <Tab.Screen name="NoAccount" component={NoAccount} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="InputCash" component={InputCash} />
        <Tab.Screen name="InputEmployee" component={InputEmployees} />
        <Tab.Screen name="SalesLayout" component={SalesLayout} />
        <Tab.Screen name="ControlLayout" component={ControlLayout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer