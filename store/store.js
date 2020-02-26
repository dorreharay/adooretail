import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers';
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'

export default createStore = (initialState = {}) => {
  const enhancers = [];
  let composeEnhancers = compose;

  const logger = createLogger({});

  const rootReducer = (state, action) => root(state, action);

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(logger, thunk),
      ...enhancers
    )
  );

  let persistor = persistStore(store)

  // persistor.purge()

  return { store, persistor }
}
