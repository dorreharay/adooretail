import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import OrdersReducer from '@reducers/OrdersReducer';
import UserReducer from '@reducers/UserReducer';
import TempReducer from '@reducers/TempReducer';
import AccountReducer from '@reducers/AccountReducer';

const RESET_STORE = 'RESET_STORE';

// const appReducer =  combineReducers({
//   orders: persistReducer(OrdersReducer),
//   user: persistReducer(UserReducer),
// });

const accountPersistConfig = {
  key: 'account',
  storage: AsyncStorage
}

const ordersPersistConfig = {
  key: 'orders',
  storage: AsyncStorage
}

const usersPersistConfig = {
  key: 'users',
  storage: AsyncStorage,
  blacklist: ['modalStatus']
}

const appReducer = combineReducers({
  account: persistReducer(accountPersistConfig, AccountReducer),
  orders: persistReducer(ordersPersistConfig, OrdersReducer),
  user: persistReducer(usersPersistConfig, UserReducer),
  temp: TempReducer
})

export const resetStore = () => ({
  type: RESET_STORE
});

export default (state, action) => {
  if (action.type === RESET_STORE) {
    const { maya } = state;
    state = { maya };
  }

  return appReducer(state, action);
};
