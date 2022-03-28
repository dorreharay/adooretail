import _ from 'lodash';

const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
  products: null,
};

export function saveAccountData(payload) {
  return {
    type: SET_ACCOUNT,
    payload,
  };
}

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload,
  };
}

const ACTION_HANDLERS = {
  [SET_ACCOUNT]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [SET_PRODUCTS]: (state, action) => {
    return { ...state, products: action.payload }
  }
};

export default function AccountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
