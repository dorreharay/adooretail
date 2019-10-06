import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './store/store'

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const { store, persistor } = createStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
