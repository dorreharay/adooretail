import API from '../httpClient/api'
import { dbidGenerator } from '@helpers'
import { PAYMENT_TYPES, PAYMENT_STATUSES } from '@constants';

const SET_ACTIVE_RECEIPT = 'SET_ACTIVE_RECEIPT'
const SET_RECEIPTS = 'SET_RECEIPTS'
const SET_LAYOUT = 'SET_LAYOUT'
const SET_RECEIPT_IDS = 'SET_RECEIPT_IDS'
const SET_PRE_RECEIPTS = 'SET_PRE_RECEIPTS'
const SET_PAYMENT_BUTTON_ACCESSIBILITY = 'SET_PAYMENT_BUTTON_ACCESSIBILITY'
const SET_ACTIVE_PAYMENT_TYPE = 'SET_ACTIVE_PAYMENT_TYPE'
const SET_ACTIVE_PAYMENT_STATUS = 'SET_ACTIVE_PAYMENT_STATUS'
const SET_TO_BE_PAID_SUM = 'SET_TO_BE_PAID_SUM'
const SET_ENTERED_SUM = 'SET_ENTERED_SUM'
const SET_EMPLOYEES_LIST_VISIBILITY = 'SET_EMPLOYEES_LIST_VISIBILITY'
const SAVE_DAY_RECEIPTS = 'SAVE_DAY_RECEIPTS'
const SAVE_STATISTICS = 'SAVE_STATISTICS'

const initialState = {
  layout: 4,
  activeReceiptIndex: 0,
  receipts: [[], [], [], []],
  receiptsIds: [null, null, null, null],
  receiptsPreStates: [],
  activePaymentType: PAYMENT_TYPES.CASH,
  activePaymentStatus: PAYMENT_STATUSES.WAITING,
  paymentButtonAccessibility: true,
  deliveryListVisible: false,
  toBePaidSum: 0,
  enteredSum: 0,
  employeesListVisible: false,
  dayReceipts: null,
  statistics: null,
};

export function generateCurrentReceiptId() {
  return function (dispatch, getState) {
    const state = getState()
    const { activeReceiptIndex, receiptsIds, } = state.orders

    const newIds = receiptsIds.map((item, index) => activeReceiptIndex === index ? dbidGenerator() : item)

    dispatch(setReceiptIds(newIds))
  }
}

export function removeCurrentReceiptId() {
  return function (dispatch, getState) {
    const state = getState()
    const { activeReceiptIndex, receiptsIds, } = state.orders

    const newIds = receiptsIds.map((item, index) => activeReceiptIndex === index ? null : item)

    dispatch(setReceiptIds(newIds))
  }
}

export function setReceiptIds(payload) {
  return {
    type: SET_RECEIPT_IDS,
    payload,
  }
}

export function setLayout(payload) {
  return {
    type: SET_LAYOUT,
    payload
  }
}

export function setActiveReceipt(payload) {
  return {
    type: SET_ACTIVE_RECEIPT,
    payload
  }
}

export function setReceipts(payload) {
  return {
    type: SET_RECEIPTS,
    payload
  }
}

export function setActivePaymentType(payload) {
  return {
    type: SET_ACTIVE_PAYMENT_TYPE,
    payload
  }
}

export function setPaymentButtonAccessibility(payload) {
  return {
    type: SET_PAYMENT_BUTTON_ACCESSIBILITY,
    payload
  }
}

export function setActivePaymentStatus(payload) {
  return {
    type: SET_ACTIVE_PAYMENT_STATUS,
    payload
  }
}

export function setEnteredSum(payload) {
  return {
    type: SET_ENTERED_SUM,
    payload
  }
}

export function setToBePaidSum(payload) {
  return {
    type: SET_TO_BE_PAID_SUM,
    payload
  }
}

export function setEmployeesListVisibility(payload) {
  return {
    type: SET_EMPLOYEES_LIST_VISIBILITY,
    payload
  }
}

export function loadStatistics() {
  return async function (dispatch, getState) {
    try {
      const store = getState()

      const historyParams = store.temp.historyParams

      const data = await API.getStatistics({
        client_id: store?.account?._id,
        date: historyParams?.date
      })

      dispatch(saveDayReceipts(data?.receipts))
      dispatch(saveStatistics(data?.statistics))
    } catch (error) {
      console.log(error)
    }
  };
}

export function saveDayReceipts(payload) {
  return {
    type: SAVE_DAY_RECEIPTS,
    payload
  }
}

export function saveStatistics(payload) {
  return {
    type: SAVE_STATISTICS,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_PRE_RECEIPTS]: (state, action) => {
    return { ...state, receiptsPreStates: action.payload }
  },
  [SET_RECEIPT_IDS]: (state, action) => {
    return { ...state, receiptsIds: action.payload }
  },
  [SET_LAYOUT]: (state, action) => {
    return { ...state, layout: action.payload }
  },
  [SET_ACTIVE_RECEIPT]: (state, action) => {
    return { ...state, activeReceiptIndex: action.payload }
  },
  [SET_RECEIPTS]: (state, action) => {
    return { ...state, receipts: action.payload }
  },
  [SET_ACTIVE_PAYMENT_TYPE]: (state, action) => {
    return { ...state, activePaymentType: action.payload }
  },
  [SET_PAYMENT_BUTTON_ACCESSIBILITY]: (state, action) => {
    return { ...state, paymentButtonAccessibility: action.payload }
  },
  [SET_ACTIVE_PAYMENT_STATUS]: (state, action) => {
    return { ...state, activePaymentStatus: action.payload }
  },
  [SET_ENTERED_SUM]: (state, action) => {
    return { ...state, enteredSum: action.payload }
  },
  [SET_TO_BE_PAID_SUM]: (state, action) => {
    return { ...state, toBePaidSum: action.payload }
  },
  [SET_EMPLOYEES_LIST_VISIBILITY]: (state, action) => {
    return { ...state, employeesListVisible: action.payload }
  },
  [SAVE_DAY_RECEIPTS]: (state, action) => {
    return { ...state, dayReceipts: action.payload }
  },
  [SAVE_STATISTICS]: (state, action) => {
    return { ...state, statistics: action.payload }
  },
};

export default function OrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
