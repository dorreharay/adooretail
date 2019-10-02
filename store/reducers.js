import {combineReducers} from 'redux';
import OrdersReducer from '../reducers/OrdersReducer';
import UserReducer from '../reducers/UserReducer';

const RESET_STORE = 'RESET_STORE';

const appReducer =  combineReducers({
  orders: OrdersReducer,
  user: UserReducer,
});

export const resetStore = () => ({
  type: RESET_STORE
});

export default (state, action) => {
  if (action.type === RESET_STORE) {
    const {maya} = state;
    state = {maya};
  }

  return appReducer(state, action);
};
