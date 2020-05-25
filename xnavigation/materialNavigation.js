import React, { useRef, useEffect, } from 'react'
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NoAccount from '../src/screens/InitialLayout/NoAccount/NoAccount'
import Login from '../src/screens/InitialLayout/Login/Login'
import InputCash from '../src/screens/InitialLayout/InputCash/InputCash';
import InputEmployees from '../src/screens/InitialLayout/InputEmployees/InputEmployees';
import SalesLayout from '../src/screens/SalesLayout/SalesLayout'
import ControlLayout from '../src/screens/ControlLayout/ControlLayout'

import { setCurrentRoute } from '@reducers/TempReducer'

// import { navigationRef } from './NavigationService'
import AppSessions from '../src/wrappers/AppSessions';

const Tab = createMaterialTopTabNavigator();

function AppContainer() {
  const dispatch = useDispatch()
  const currentRoute = useSelector(state => state.temp.currentRoute)

  const navigationRef = useRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        if (state.index !== currentRoute) {
          dispatch(setCurrentRoute(state.index))
        }
      }}
    >
      <AppSessions navigationRef={navigationRef}>
        <Tab.Navigator
          // initialRouteName='Login'
          backBehavior='none'
          swipeEnabled={false}
          tabBar={() => null}
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
      </AppSessions>
    </NavigationContainer>
  );
}

export default AppContainer