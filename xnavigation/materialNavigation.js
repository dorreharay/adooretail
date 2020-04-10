import React from 'react'
import { View, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import NoAccount from '../src/screens/InitialLayout/NoAccount/NoAccount'
import Login from '../src/screens/InitialLayout/Login/Login'
import InputCash from '../src/screens/InitialLayout/InputCash/InputCash';
import InputEmployees from '../src/screens/InitialLayout/InputEmployees/InputEmployees';
import SalesLayout from '../src/screens/SalesLayout/SalesLayout'
import ControlLayout from '../src/screens/ControlLayout/NewControlLayout'

const materialNavigation = createMaterialTopTabNavigator(
  {
    NoAccount: { screen: NoAccount, },
    Login: { screen: Login, },
    InputCash: { screen: InputCash, },
    InputEmployee: { screen: InputEmployees },
    SalesLayout: { screen: SalesLayout, },
    ControlLayout: { screen: ControlLayout, },
  },
  {
    defaultNavigationOptions: {
      header: null,
      tabBarVisible: false,
      swipeEnabled: false,
      backBehavior: 'none',
      optimizationsEnabled: true,
      lazy: true,
      removeClippedSubviews: Platform.OS === 'android',
      // lazyPlaceholder: () => <View style={{ width: 100, height :100, backgroundColor: 'red' }}></View>
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 200,
      },
    }),
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(materialNavigation);

export default AppContainer