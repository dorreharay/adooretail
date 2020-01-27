import moment from 'moment-timezone'

const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
const UPDATE_CURRENT_SESSIONS = 'UPDATE_CURRENT_SESSIONS';
const SET_START_CASH = 'SET_START_CASH';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SAVE_CURRENT_ACCOUNT_INDEX = 'SAVE_CURRENT_ACCOUNT_INDEX';
const SAVE_CURRENT_ACCOUNT_TOKEN = 'SAVE_CURRENT_ACCOUNT_TOKEN';
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_FIVE_MINUTES_TO_SHIFT = 'ADD_FIVE_MINUTES_TO_SHIFT';
const RESTORE_DEFAULT_SHIFT = 'RESTORE_DEFAULT_SHIFT';
const SAVE_LOCAL_RECEIPT = 'SAVE_LOCAL_RECEIPT';
const SYNC_DATA = 'SYNC_DATA';
const SET_BOUNDS = 'SET_BOUNDS';
const SET_AVAILABLE_TEAMS = 'SET_AVAILABLE_TEAMS'

const initialState = {
  token: '',
  startCash: 0,
  initialLoading: true,
  currentAccountIndex: 0,
  currentAccountToken: '5cb1ed89c6bf28192c152435',
  pinCode: '1111222',
  bounds: [{
    name: 'Кухня',
    sizes: {
      w: 200,
      h: 200,
    },
    position: {
      x: 0,
      y: 0,
    }
  }],
  accounts: [
    {
      id: '4sd3fsgu76fg55akgjsd54jadfnu343',
      token: '5cb1ed89c6bf28192c152435',
      businessName: 'Poilka Coffee Бариста 1',
      registeredDeviceIds: [
        '888f33dcebf0800b',
        '67CA2667-D89D-4951-8112-7EA50AF8DA94',
      ],
      img_url: 'https://20.ua/ru/media-resize/company_show_new/poilka-coffee-point-kofeynya-250530.png?timestamp=1568043128',
      default_shift_end: {
        hours: 19,
        minutes: 0,
      },
      shift_start: {
        hours: 1,
        minutes: 0,
      },
      shift_end: {
        hours: 19,
        minutes: 0,
      },
      employees: [
        {
          name: 'Ігор',
          icon: '',
        },
        {
          name: 'Іра',
          icon: '',
        },
        {
          name: 'Наташа',
          icon: '',
        },
        {
          name: 'Андрій',
          icon: '',
        },
        {
          name: 'Льоша',
          icon: '',
        }
      ],
      products: [],
      localSessions: [],
      available_teams: {
        paydesk: true,
        kitchen: false,
      }
    },
    {
      id: '4sd3fsgu76fg55akgjsd54jadfnu343',
      token: '5cb1ed89c6bf28192c152374',
      businessName: 'Poilka Coffee Бариста 2',
      img_url: 'https://20.ua/ru/media-resize/company_show_new/poilka-coffee-point-kofeynya-250530.png?timestamp=1568043128',
      shift_start: {
        hours: 7,
        minutes: 0,
      },
      shift_end: {
        hours: 0,
        minutes: 42,
      },
      registeredDeviceIds: [
        '888f33dcebf0800b',
        '67CA2667-D89D-4951-8112-7EA50AF8DA94',
      ],
      employees: [
        {
          name: 'Ігор',
          icon: '',
        },
        {
          name: 'Іра',
          icon: '',
        },
        {
          name: 'Наташа',
          icon: '',
        },
        {
          name: 'Андрій',
          icon: '',
        },
        {
          name: 'Льоша',
          icon: '',
        }
      ],
      products: [],
      localSessions: [],
      receipts: [],
    },
  ],
};

export function setAvailableTeams(payload) {
  return {
    type: SET_AVAILABLE_TEAMS,
    payload
  }
}

export function setBounds(payload) {
  return {
    type: SET_BOUNDS,
    payload
  }
}

export function syncDataWithStore(payload) {
  return {
    type: SYNC_DATA,
    payload
  }
}

export function saveLocalReceipt(payload) {
  return {
    type: SAVE_LOCAL_RECEIPT,
    payload
  }
}

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload
  }
}

export function saveCurrentAccountIndex(payload) {
  return {
    type: SAVE_CURRENT_ACCOUNT_INDEX,
    payload
  }
}

export function saveCurrentAccountToken(payload) {
  return {
    type: SAVE_CURRENT_ACCOUNT_TOKEN,
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

export function addFiveMinutesToShift(payload) {
  return {
    type: ADD_FIVE_MINUTES_TO_SHIFT,
    payload
  }
}

export function restoreDefaultShift(payload) {
  return {
    type: RESTORE_DEFAULT_SHIFT,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_AVAILABLE_TEAMS]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const data = action.payload

    const newAccounts = accounts.map((item, id) => {
      if (id === currentAccountIndex) {
        return ({
          ...item,
          available_teams: data,
        })
      } else {
        return item
      }
    })

    return { ...state, accounts: newAccounts, }
  },
  [SYNC_DATA]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const data = action.payload

    const newAccounts = accounts.map((item, id) => {
      if (id === currentAccountIndex) {
        return ({
          ...item,
          ...data,
        })
      } else {
        return item
      }
    })

    return { ...state, accounts: newAccounts, }
  },
  [SAVE_LOCAL_RECEIPT]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const newReceipt = action.payload

    const newAccounts = accounts.map((item, id) => {
      if (id === currentAccountIndex) {
        const lastSessionIndex = item.localSessions.length - 1

        return ({
          ...item,
          localSessions: item.localSessions.map((elem, key) => lastSessionIndex === key ? ({ ...elem, receipts: [...elem.receipts, newReceipt] }) : elem)
        })
      } else {
        return item
      }
    })

    return { ...state, accounts: newAccounts, }
  },
  [SET_PRODUCTS]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const newProducts = action.payload

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, products: newProducts }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [ADD_FIVE_MINUTES_TO_SHIFT]: (state, action) => {
    const { accounts, currentAccountIndex, } = state

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, shift_end: { ...item.shift_end, minutes: item.shift_end.minutes + 5 } }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [RESTORE_DEFAULT_SHIFT]: (state, action) => {
    const { accounts, currentAccountIndex, } = state

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, shift_end: item.default_shift_end }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [CHANGE_ACCOUNT]: (state, action) => {
    return { ...state, currentAccount: action.payload }
  },
  [SET_AUTH_TOKEN]: (state, action) => {
    return { ...state, token: action.payload }
  },
  [SAVE_CURRENT_ACCOUNT_INDEX]: (state, action) => {
    return { ...state, currentAccountIndex: action.payload }
  },
  [SET_BOUNDS]: (state, action) => {
    return { ...state, bounds: action.payload }
  },
  [SAVE_CURRENT_ACCOUNT_TOKEN]: (state, action) => {
    return { ...state, currentAccountToken: action.payload }
  },
  [UPDATE_CURRENT_SESSIONS]: (state, action) => {
    const { status, endCash, newSessionProp } = action.payload
    const { accounts, currentAccountIndex } = state

    const localSessions = accounts[currentAccountIndex].localSessions

    let newSession = {}, updatedSessions = []

    if (status === 'new') {
      newSession = {
        ...newSessionProp,
        receipts: [],
        startTime: moment(Date.now()).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss'),
      }

      updatedSessions = [...localSessions, newSession]
    }

    if (status === 'end') {
      const lastIndex = localSessions.length - 1
      const currentSession = localSessions[lastIndex]

      newSession = {
        ...currentSession,
        endTime: moment(Date.now()).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss'),
        endCash,
        total: currentSession.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false),
      }

      updatedSessions = localSessions.map((localSession, localIndex) => {
        if (localIndex === localSessions.length - 1) {
          return newSession
        } else {
          return localSession
        }
      })
    }

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, localSessions: updatedSessions }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [SET_START_CASH]: (state, action) => {
    return { ...state, startCash: action.payload }
  },
  [SET_EMPLOYEES]: (state, action) => {
    return { ...state, employees: action.payload }
  },
};

export default function UserReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
