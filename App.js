import { createMaterialTopTabNavigator , createAppContainer } from "react-navigation";
import React from 'react'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';

import AppContainer from './xnavigation/materialNavigation'
import NavigationService from './NavigationService';

function MainApp() {  
  return (
    <>
      <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
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