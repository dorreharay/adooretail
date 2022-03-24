import _ from 'lodash';

const SAVE_ACCOUNT = 'SAVE_ACCOUNT';

const initialState = null;

export function saveAccountData(payload) {
  return {
    type: SAVE_ACCOUNT,
    payload,
  };
}

const ACTION_HANDLERS = {
  [SAVE_ACCOUNT]: (state, action) => {
    return { ...state, ...action.payload };
  },
};

export default function AccountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
