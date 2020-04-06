import React from 'react'
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
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(materialNavigation);

export default AppContainer