const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
const RESET_USER = 'RESET_USER';

const initialState = {};

export function startSession(payload) {
  return {
    type: SET_ACCOUNT,
    payload,
  };
}

export function finishSession(payload) {
  return {
    type: SET_PRODUCTS_LIST,
    payload,
  };
}

const ACTION_HANDLERS = {
  [SET_ACCOUNT]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [SET_PRODUCTS_LIST]: (state, action) => {
    return { ...state, products: action.payload };
  },
  [RESET_USER]: () => {
    return initialState;
  },
};

export default function SessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
