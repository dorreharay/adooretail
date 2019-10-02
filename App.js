import { createMaterialTopTabNavigator , createAppContainer } from "react-navigation";
import React from 'react'

import AppContainer from './xnavigation/materialNavigation'
import NavigationService from './NavigationService';

function App() {  
  return (
    <AppContainer 
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  )
}

export default App

console.disableYellowBox = true; 