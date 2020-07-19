import { getFormattedDate, } from '@dateFormatter'
import { syncSessions, } from '@helpers'
import _ from 'lodash'
import API from '../httpClient/api'

const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
const UPDATE_CURRENT_SESSIONS = 'UPDATE_CURRENT_SESSIONS';
const SET_START_CASH = 'SET_START_CASH';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const ADD_FIVE_MINUTES_TO_SHIFT = 'ADD_FIVE_MINUTES_TO_SHIFT';
const RESTORE_DEFAULT_SHIFT = 'RESTORE_DEFAULT_SHIFT';
const SAVE_LOCAL_RECEIPT = 'SAVE_LOCAL_RECEIPT';
const SYNC_DATA = 'SYNC_DATA';
const SET_SETTINGS = 'SET_SETTINGS';
const ADD_ACCOUNT = 'ADD_ACCOUNT';
const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
const SET_NEED_TO_REENTER = 'SET_NEED_TO_REENTER';
const SET_HISTORY = 'SET_HISTORY'
const SET_ACTIVE_BACKGROUND_INDEX = 'SET_ACTIVE_BACKGROUND_INDEX'
const RESET_SESSION = 'RESET_SESSION'
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CURRENT_EMPLOYEE = 'SET_CURRENT_EMPLOYEE';
const SET_CURRENT_SERVICE = 'SET_CURRENT_SERVICE';
const SET_INITIAL_FLOW = 'SET_INITIAL_FLOW'
const UPDATE_LOCAL_RECEIPT = 'UPDATE_LOCAL_RECEIPT'
const RESET_USER = 'RESET_USER'

const initialState = {
  startCash: 0,
  currentAccount: null,
  activeBackgroundIndex: 0,
  currentEmployee: 0,
  currentService: 0,
  initialFlow: true,
  settings: {
    shifts_enabled: false,
    printer_enabled: false,
    printer_autoconnection_enabled: false,
    printer_bluetooth: false,
    printer_net: false,
    printer_precheck: false,
    printer_preorder: false,
    desk_enabled: true,
    kitchen_enabled: true,
    payment_type_cash: true,
    payment_type_cash_default: false,
    payment_type_debit: true,
    payment_type_debit_default: false,
    payment_type_unchecked: false,
    delivery_use: false,
    delivery_position_side: false,
    delivery_position_quick: false,
    receipt_show_logo: false,
    receipt_show_subheader: true,
    receipt_show_address: true,
    receipt_show_qr: false,
    receipt_show_description: false,
  }
};

export function addAccount(payload) {
  return {
    type: ADD_ACCOUNT,
    payload
  }
}

export function setInitialFlowStatus(payload) {
  return {
    type: SET_INITIAL_FLOW,
    payload
  }
}

export function setSettings(payload) {
  return {
    type: SET_SETTINGS,
    payload
  }
}

export function setActiveBackgroundIndex(payload) {
  return {
    type: SET_ACTIVE_BACKGROUND_INDEX,
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

export function setHistoryAndOptions(payload, options) {
  return {
    type: SET_HISTORY,
    payload,
    options,
  }
}

export function setCurrentEmployee(payload) {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload
  }
}

export function setCurrentService(payload) {
  return {
    type: SET_CURRENT_SERVICE,
    payload
  }
}

export function getSessions(changedOptions, callback) {
  return async function (dispatch, getState) {
    try {
      const store = getState()

      const { currentAccount, } = store.user

      const payload = {
        offset: changedOptions.offset ? changedOptions.offset === 'onemore' ? currentAccount.historyOptions.offset + 1 : changedOptions.active_filter ? 1 : changedOptions.offset : currentAccount.historyOptions.offset,
        items_per_page: changedOptions.items_per_page || currentAccount.historyOptions.items_per_page,
        active_sort: changedOptions.active_sort || currentAccount.historyOptions.active_sort,
        active_filter: changedOptions.active_filter || currentAccount.historyOptions.active_filter,
      }

      const data = await API.getSessions({
        token: currentAccount.id,
        ...payload,
      })

      dispatch(setHistoryAndOptions(data, payload))

      callback()
    } catch (error) {
      console.log(error)
    }
  };
}

export function syncReceipt(receipt) {
  return async function (dispatch, getState) {
    try {
      const store = getState()

      const { currentAccount } = store.user

      const newLocalSessions = currentAccount.localSessions.map((elem, key) => {
        return currentAccount.localSessions.length - 1 === key ? ({ ...elem, receipts: [...elem.receipts, receipt] }) : elem
      })

      dispatch(saveLocalReceipt(receipt))

      await syncSessions(() => { }, newLocalSessions)
    } catch (error) {
      console.log(error)
    }
  };
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

export function resetSessions(payload) {
  return {
    type: RESET_SESSION,
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

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload
  }
}

export function updateLocalReceipt(receiptSum, editedPaymentType) {
  return async function (dispatch, getState) {
    try {
      const store = getState()

      const { currentAccount } = store.user
      const { editedReceiptId, editedReceiptPayload, updateModeData, } = store.orders

      const lastSessionIndex = currentAccount.localSessions.length - 1

      const newLocalSessions = currentAccount.localSessions.map((elem, key) => {
        return lastSessionIndex === key ? ({ 
          ...elem,
          receipts: elem.receipts.map(item => {
            return item.hash_id === editedReceiptId ? ({
              ...editedReceiptPayload,
              receipt: updateModeData,
              initial: receiptSum,
              input: receiptSum,
              total: receiptSum,
              edited: true,
              payment_type: editedPaymentType === 'debit' ? 'card' : 'cash',
            }) : item
          })
        }) : elem
      })

      dispatch({
        type: UPDATE_LOCAL_RECEIPT,
        payload: newLocalSessions,
      })

      await syncSessions(() => { }, newLocalSessions)
    } catch (error) {
      console.log(error)
    }
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  }
}

const ACTION_HANDLERS = {
  [SAVE_TRANSACTION]: (state, action) => {
    const { currentAccount } = state
    const localSessions = currentAccount.localSessions
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

    return { ...state, currentAccount: ({ ...currentAccount, localSessions: updatedSessions }), }
  },
  [SET_NEED_TO_REENTER]: (state, action) => {
    const { currentAccount } = state

    const newNeedToReenter = action.payload

    return { ...state, currentAccount: ({ ...currentAccount, needToReenter: newNeedToReenter }), }
  },
  [ADD_ACCOUNT]: (state, action) => {
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
      history: [],
      historyOptions: {
        offset: 1,
        items_per_page: 30,
        active_filter: 'day',
        active_sort: 'time-desc',
      },
    }

    return {
      ...state,
      currentAccount: payload,
    }
  },
  [SET_SETTINGS]: (state, action) => {
    const { settings } = state
    const data = action.payload

    return {
      ...state,
      settings: {
        ...settings,
        ...data
      },
    }
  },
  [SYNC_DATA]: (state, action) => {
    const { currentAccount } = state
    const data = action.payload

    return {
      ...state,
      currentAccount: {
        ...currentAccount,
        ...data,
        passcodes: data.client_data.passcodes,
        updatePeriod: data.client_data.update_period,
      },
    }
  },
  [SET_HISTORY]: (state, action) => {
    const { currentAccount } = state
    const data = action.payload
    const options = action.options

    return {
      ...state,
      currentAccount: {
        ...currentAccount,
        history: data,
        historyOptions: options ? options : ({ ...currentAccount.historyOptions, offset: 1, })
      },
    }
  },
  [SAVE_LOCAL_RECEIPT]: (state, action) => {
    const { currentAccount } = state
    const newReceipt = action.payload

    const lastSessionIndex = currentAccount.localSessions.length - 1

    const newLocalSessions = currentAccount.localSessions.map((elem, key) => lastSessionIndex === key ? ({ ...elem, receipts: [...elem.receipts, newReceipt] }) : elem)

    return ({
      ...state,
      currentAccount: {
        ...currentAccount,
        localSessions: newLocalSessions
      }
    })
  },
  [ADD_FIVE_MINUTES_TO_SHIFT]: (state, action) => {
    const { currentAccount, } = state

    return { ...state, currentAccount: ({ ...currentAccount, shift_end: { ...currentAccount.shift_end, minutes: currentAccount.shift_end.minutes + 5 } }), }
  },
  [RESTORE_DEFAULT_SHIFT]: (state, action) => {
    const { currentAccount, } = state

    return { ...state, currentAccount: ({ ...currentAccount, shift_end: currentAccount.default_shift_end }), }
  },
  [CHANGE_ACCOUNT]: (state, action) => {
    return { ...state, currentAccount: action.payload }
  },
  [RESET_SESSION]: (state, action) => {
    const { currentAccount } = state

    return { ...state, currentAccount: { ...currentAccount, localSessions: [] }, }
  },
  [UPDATE_CURRENT_SESSIONS]: (state, action) => {
    const { status, endCash, reportPhoto, newSessionProp } = action.payload
    const { currentAccount } = state

    const localSessions = currentAccount.localSessions

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
        reportPhoto,
        total: currentSession.receipts.length > 0 ? currentSession.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), 0) : 0,
      }

      updatedSessions = localSessions.map((localSession, localIndex) => {
        if (localIndex === localSessions.length - 1) {
          return newSession
        } else {
          return localSession
        }
      })
    }

    return { ...state, currentAccount: { ...currentAccount, localSessions: updatedSessions }, }
  },
  [SET_START_CASH]: (state, action) => {
    return { ...state, startCash: action.payload }
  },
  [SET_EMPLOYEES]: (state, action) => {
    return { ...state, employees: action.payload }
  },
  [SET_ACTIVE_BACKGROUND_INDEX]: (state, action) => {
    return { ...state, activeBackgroundIndex: action.payload }
  },
  [SET_PRODUCTS]: (state, action) => {
    const { currentAccount } = state
    const newProducts = action.payload

    return { ...state, currentAccount: { ...currentAccount, products: newProducts }, }
  },
  [SET_CURRENT_EMPLOYEE]: (state, action) => {
    return { ...state, currentEmployee: action.payload }
  },
  [SET_CURRENT_SERVICE]: (state, action) => {
    return { ...state, currentService: action.payload }
  },
  [SET_INITIAL_FLOW]: (state, action) => {
    return { ...state, initialFlow: action.payload }
  },
  [UPDATE_LOCAL_RECEIPT]: (state, action) => {
    const { currentAccount } = state

    return { ...state, currentAccount: { ...currentAccount, localSessions: action.payload }, }
  },
  [RESET_USER]: () => {
    return initialState
  },
};

export default function UserReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
