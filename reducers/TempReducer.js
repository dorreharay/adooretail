

const SET_END_OF_SESSION_STATUS = 'SET_END_OF_SESSION_STATUS';
const SET_ORIENTATION_DIMENSIONS = 'SET_ORIENTATION_DIMENSIONS'
const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE'

const initialState = {
  endOfSession: false,
  dimensions: {
    deviceWidth: 0,
    deviceHeight: 0,
  },
  currentRoute: 0,
};

export function setEndOfSessionStatus(payload) {
  return {
    type: SET_END_OF_SESSION_STATUS,
    payload
  }
}

export function setOrientationDimensions(payload) {
  return {
    type: SET_ORIENTATION_DIMENSIONS,
    payload
  }
}

export function setCurrentRoute(payload) {
  return {
    type: SET_CURRENT_ROUTE,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_END_OF_SESSION_STATUS]: (state, action) => {
    return { ...state, endOfSession: action.payload }
  },
  [SET_ORIENTATION_DIMENSIONS]: (state, action) => {
    return { ...state, dimensions: action.payload }
  },
  [SET_CURRENT_ROUTE]: (state, action) => {
    return { ...state, currentRoute: action.payload }
  },
};

export default function TempReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
