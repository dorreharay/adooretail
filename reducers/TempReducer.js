const SET_END_OF_SESSION_STATUS = 'SET_END_OF_SESSION_STATUS';

const initialState = {
  endOfSession: false,
};

export function setEndOfSessionStatus(payload) {
  return {
    type: SET_END_OF_SESSION_STATUS,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_END_OF_SESSION_STATUS]: (state, action) => {
    return {...state, endOfSession: action.payload}
  },
};

export default function TempReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
