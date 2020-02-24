import { getFormattedDate, } from '@dateFormatter'
import { syncSessions, } from '@requests'

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
const SET_SETTINGS = 'SET_SETTINGS';
const ADD_ACCOUNT = 'ADD_ACCOUNT';
const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
const SET_NEED_TO_REENTER = 'SET_NEED_TO_REENTER';

const initialState = {
  token: '',
  startCash: 0,
  initialLoading: true,
  currentAccountIndex: 0,
  currentAccountToken: '',
  bounds: [],
  accounts: [],
};

export function addAccount(payload) {
  return {
    type: ADD_ACCOUNT,
    payload
  }
}

export function setSettings(payload) {
  return {
    type: SET_SETTINGS,
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

function saveLocalReceipt(payload) {
  return {
    type: SAVE_LOCAL_RECEIPT,
    payload
  }
}

export function syncReceipt(receipt) {
  return async function(dispatch, getState) {
    try {
      const store = getState()

      const { accounts, currentAccountIndex } = store.user

      const newLocalSessions = accounts[currentAccountIndex].localSessions.map((elem, key) => {
        return accounts[currentAccountIndex].localSessions.length - 1 === key ? ({ ...elem, receipts: [...elem.receipts, receipt] }) : elem
      })
  
      dispatch(saveLocalReceipt(receipt))

      await syncSessions(() => {}, newLocalSessions)
    } catch (error) {
      console.log(error)
    }
  };
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

export function saveTransaction(payload) {
  return {
    type: SAVE_TRANSACTION,
    payload
  }
}

export function setNeedToReenter(payload) {
  return {
    type: SET_NEED_TO_REENTER,
    payload
  }
}

const ACTION_HANDLERS = {
  [SAVE_TRANSACTION]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const localSessions = accounts[currentAccountIndex].localSessions
    const newTransaction = action.payload

    const lastIndex = localSessions.length - 1
    const currentSession = localSessions[lastIndex]

    newSession = {
      ...currentSession,
      transactions: [...currentSession.transactions, newTransaction]
    }

    updatedSessions = localSessions.map((localSession, localIndex) => {
      if (localIndex === localSessions.length - 1) {
        return newSession
      } else {
        return localSession
      }
    })

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, localSessions: updatedSessions }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [SET_NEED_TO_REENTER]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const newNeedToReenter = action.payload

    const newAccounts = accounts.map((item, id) => id === currentAccountIndex ? ({ ...item, needToReenter: newNeedToReenter }) : item)

    return { ...state, accounts: newAccounts, }
  },
  [ADD_ACCOUNT]: (state, action) => {
    const { accounts, } = state
    const data = action.payload.result
    const client_data = action.payload.client_data

    const payload = {
      id: data._id.slice(0, data._id.length / 2) + data._id.slice(data._id.length / 2),
      token: data._id,
      ...data,
      localSessions: [],
      products: [],
      passcodes: client_data.passcodes,
      needToReenter: false,
    }

    return {
      ...state,
      accounts: [...accounts, payload],
      currentAccountIndex: [...accounts, {}].length - 1,
      currentAccountToken: data._id,
    }
  },
  [SET_SETTINGS]: (state, action) => {
    const { accounts, currentAccountIndex } = state
    const data = action.payload

    const newAccounts = accounts.map((item, id) => {
      if (id === currentAccountIndex) {
        return ({
          ...item,
          settings: data,
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
          passcodes: data.client_data.passcodes,
          updatePeriod: data.client_data.update_period,
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
        
        const newLocalSessions = item.localSessions.map((elem, key) => lastSessionIndex === key ? ({ ...elem, receipts: [...elem.receipts, newReceipt] }) : elem)

        return ({
          ...item,
          localSessions: newLocalSessions
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
        startTime: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
      }

      updatedSessions = [...localSessions, newSession]
    }

    if (status === 'end') {
      const lastIndex = localSessions.length - 1
      const currentSession = localSessions[lastIndex]

      newSession = {
        ...currentSession,
        endTime: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
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
