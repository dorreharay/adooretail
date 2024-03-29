import React, { useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Initial1 from './src/screens/InitialLayout/Initial1/Initial1';
import Initial2 from './src/screens/InitialLayout/Initial2/Initial2';
import NoAccount from './src/screens/InitialLayout/NoAccount/NoAccount';
import Login from './src/screens/InitialLayout/Login/Login';
import SalesLayout from './src/screens/SalesLayout/SalesLayout';
import ControlLayout from './src/screens/ControlLayout/ControlLayout';

import { setCurrentRoute, setSessionModalState } from '@reducers/TempReducer';

import { lastSessionSelector } from '@selectors';
// import { navigationRef } from './NavigationService'
import AppSessions from './src/wrappers/AppSessions';

const Tab = createMaterialTopTabNavigator();

function AppContainer() {
  const navigationRef = useRef();

  const dispatch = useDispatch();

  const currentRoute = useSelector(state => state.temp.currentRoute);
  const account = useSelector(state => state.account);
  const initialFlow = useSelector(state => state.user.initialFlow);

  const lastSession = useSelector(lastSessionSelector);

  let initialRoute = 'SalesLayout';

  if (initialFlow) {
    initialRoute = 'Initial1';
  } else if (account?._id) {
    if (lastSession?.summary?.time_start) {
      initialRoute = 'SalesLayout';
    } else {
      initialRoute = 'Login';
    }
  } else {
    initialRoute = 'NoAccount';
  }

  useEffect(() => {
    if (
      initialRoute === 'SalesLayout' &&
      (!lastSession || lastSession?.summary?.time_end)
    ) {
      dispatch(setSessionModalState(true));
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        if (state.index !== currentRoute) {
          dispatch(setCurrentRoute(state.index));
        }
      }}
    >
      <AppSessions navigationRef={navigationRef}>
        <Tab.Navigator
          initialRouteName={initialRoute}
          backBehavior="none"
          swipeEnabled={false}
          tabBar={() => null}
          removeClippedSubviews={Platform.OS === 'android'}
          sceneContainerStyle={{
            backgroundColor: '#FFFFFF00',
          }}
          style={{
            backgroundColor: '#FFFFFF00',
          }}
        >
          <Tab.Screen name="Initial1" component={Initial1} />
          <Tab.Screen name="Initial2" component={Initial2} />
          <Tab.Screen name="NoAccount" component={NoAccount} />

          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SalesLayout" component={SalesLayout} />
          <Tab.Screen name="ControlLayout" component={ControlLayout} />
        </Tab.Navigator>
      </AppSessions>
    </NavigationContainer>
  );
}

export default AppContainer;
