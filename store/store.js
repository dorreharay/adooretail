import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers';
// import client from '../apollo'

const createStore = (initialState = {}) => {

  // ======================================================
  // Middleware Configuration
  // ======================================================
  //Added Apollo client to actions. See docs how use it: https://www.apollographql.com/docs/react/api/apollo-client.html
  // const middleware = [thunk.withExtraArgument(client)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
      state = undefined;
    }
  
    return root(state, action);
  }

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(
      // applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = history.listen(updateLocation(store));


  return store
};

export default createStore;
