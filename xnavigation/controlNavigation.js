import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import History from '../src/screens/ControlLayout/components/ContentPanel/Pages/History/History'
// import Login from '../src/screens/InitialLayout/Login/Login'
// import InputCash from '../src/screens/InitialLayout/InputCash/InputCash';
// import InputEmployees from '../src/screens/InitialLayout/InputEmployees/InputEmployees';

const navigation = createMaterialTopTabNavigator(
  {
    History: { screen: History, },
    // Login: { screen: Login, },
    // InputCash: { screen: InputCash, },
    // InputEmployee: { screen: InputEmployees },
  },
  {
    defaultNavigationOptions: {
      header: null,
      tabBarVisible: false,
      swipeEnabled: false,
      backBehavior: 'none',
      optimizationsEnabled: true,
      // lazy: true,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    initialRouteName: 'History',
  }
);

const controlNavigation = createAppContainer(navigation);

export default controlNavigation