import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import InitialLayout from '../src/screens/InitialLayout/InitialLayout'

const defaultTabBarOptions = {
  inactiveTintColor: '#8e8e93',
  style: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#F1F1F1',
  },
  labelStyle: {
    fontSize: 12,
    // fontFamily: 'Circe-Regular',
  },
  tabStyle: {
    alignItem: 'center',
    flexDirection: 'column',
  },
}

const materialNavigation = createMaterialTopTabNavigator (
  {
    InitialLayout: { screen: InitialLayout },
  },
  {
    defaultNavigationOptions: {
      header: null,
      tabBarVisible: false,
      swipeEnabled: false,
      backBehavior: 'order',
      optimizationsEnabled: true,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    initialRouteName: 'InitialLayout',
  }
);

const AppContainer = createAppContainer(materialNavigation);

export default AppContainer