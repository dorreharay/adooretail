import moment from 'moment-timezone'

const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
const UPDATE_CURRENT_SESSIONS = 'UPDATE_CURRENT_SESSIONS';
const SET_START_CASH = 'SET_START_CASH';
const SET_EMPLOYEES = 'SET_EMPLOYEES';

const initialState = {
  token: '',
  startCash: 0,
  employees: [],
  initialLoading: true,
  accounts: [
    {
      id: 1,
      token: '5cb1ed89c6bf28192c152435',
      businessName: 'Poilka Coffee',
      img_url: 'https://20.ua/ru/media-resize/company_show_new/poilka-coffee-point-kofeynya-250530.png?timestamp=1568043128',
      pinCode: '1111222',
      registeredDeviceIds: [
        '888f33dcebf0800b',
        '67CA2667-D89D-4951-8112-7EA50AF8DA94',
      ],
      employees : [ 
        {
            name : 'Ігор',
            icon : '',
        }, 
        {
            name : 'Іра',
            icon : '',
        }, 
        {
            name : 'Наташа',
            icon : '',
        }, 
        {
            name : 'Андрій',
            icon : '',
        }, 
        {
            name : 'Льоша',
            icon : '',
        }
    ],
    },
    {},
    {},
  ],
  localSessions: [],
  currentAccount: {},
};

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

export function updateCurrentSession(payload) {
  return {
    type: UPDATE_CURRENT_SESSIONS,
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
  [CHANGE_ACCOUNT]: (state, action) => {
    return {...state, currentAccount: action.payload}
  },
  [SET_AUTH_TOKEN]: (state, action) => {
    return {...state, token: action.payload}
  },
  [UPDATE_CURRENT_SESSIONS]: (state, action) => {
    const { status, newSessionProp } = action.payload
    const { localSessions } = state

    let newSession = {}, updatedSessions = []

    if(status === 'new') {
      newSession = {
        ...newSessionProp,
        startTime: moment(Date.now()).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm'),
      }

      updatedSessions = [...localSessions, newSession]
    } 
    
    if(status === 'end') {
      const lastIndex = localSessions.length - 1
      const currentSession = localSessions[lastIndex]

      newSession = {
        ...currentSession,
        endTime: moment(Date.now()).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm'),
      }

      updatedSessions = localSessions.map((localSession, localIndex) => {
        if(localIndex === localSessions.length - 1) { 
          return newSession
        }
      })
    }

    return {...state, localSessions: updatedSessions,}
  },
  [SET_START_CASH]: (state, action) => {
    return {...state, startCash: action.payload}
  },
  [SET_EMPLOYEES]: (state, action) => {
    return {...state, employees: action.payload}
  },
};

export default function UserReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
