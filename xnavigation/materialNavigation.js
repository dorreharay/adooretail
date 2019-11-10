import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import NoAccount from '../src/screens/InitialLayout/components/NoAccount/NoAccount'
import Login from '../src/screens/InitialLayout/components/Login/Login'
import InputCash from '../src/screens/InitialLayout/components/InputCash/InputCash';
import InputEmployees from '../src/screens/InitialLayout/components/InputEmployees/InputEmployees';
import SalesLayout from '../src/screens/SalesLayout/SalesLayout'

const materialNavigation = createMaterialTopTabNavigator (
  {
    NoAccount: { screen: NoAccount },
    Login: { screen: Login, },
    InputCash: { screen: InputCash, },
    InputEmployee: { screen: InputEmployees },
    SalesLayout: { screen: SalesLayout, },
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