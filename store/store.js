import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers';
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

export default createStore = (initialState = {}) => {
  const enhancers = [];
  let composeEnhancers = compose;

  const logger = createLogger({});

  const rootReducer = (state, action) => root(state, action);

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createReduxStore(
    persistedReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(logger),
      ...enhancers
    )
  );

  let persistor = persistStore(store)

  // persistor.flush()

  return { store, persistor }
}
