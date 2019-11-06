const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
const SET_CURRENT_SESSION = 'SET_CURRENT_SESSION';
const SET_START_CASH = 'SET_START_CASH';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_END_OF_SESSION_STATUS = 'SET_END_OF_SESSION_STATUS';
const SET_INITIAL_SLIDE = 'SET_INITIAL_SLIDE';

const initialState = {
  token: '',
  currentSession: {},
  startCash: 0,
  employees: [],
  endOfSession: false,
  initialLoading: true,
  accounts: [
    { id: 1, businessName: 'Poilka Coffee', img_url: 'https://20.ua/ru/media-resize/company_show_new/poilka-coffee-point-kofeynya-250530.png?timestamp=1568043128', },
    {},
    {}
  ],
  currentAccount: {},
  initialSlide: false,
};

export function setInitialSlide(payload) {
  return {
    type: SET_INITIAL_SLIDE,
    payload
  }
}

export function changeAccount(payload) {
  return {
    type: CHANGE_ACCOUNT,
    payload
  }
}

export function setAuthToken(payload) {
  return {
    type: SET_AUTH_TOKEN,
    payload
  }
}

export function setEndOfSessionStatus(payload) {
  return {
    type: SET_END_OF_SESSION_STATUS,
    payload
  }
}

export function setCurrentSession(payload) {
  return {
    type: SET_CURRENT_SESSION,
    payload
  }
}


export function setStartCash(payload) {
  return {
    type: SET_START_CASH,
    payload
  }
}

export function setEmployees(payload) {
  return {
    type: SET_EMPLOYEES,
    payload
  }
}


const ACTION_HANDLERS = {
  [SET_INITIAL_SLIDE]: (state, action) => {
    return {...state, initialSlide: action.payload}
  },
  [CHANGE_ACCOUNT]: (state, action) => {
    return {...state, currentAccount: action.payload}
  },
  [SET_AUTH_TOKEN]: (state, action) => {
    return {...state, token: action.payload}
  },
  [SET_CURRENT_SESSION]: (state, action) => {
    const currentSession = !action.payload ? {} : action.payload

    return {...state, currentSession}
  },
  [SET_START_CASH]: (state, action) => {
    return {...state, startCash: action.payload}
  },
  [SET_EMPLOYEES]: (state, action) => {
    return {...state, employees: action.payload}
  },
  [SET_END_OF_SESSION_STATUS]: (state, action) => {
    return {...state, endOfSession: action.payload}
  },
};

export default function UserReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
