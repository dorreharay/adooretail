
import { getFormattedDate, } from '@dateFormatter'
import API from '../httpClient/api'

const SET_SELECTED_RECEIPT = 'SET_SELECTED_RECEIPT'
const SET_RECEIPTS = 'SET_RECEIPTS'
const SET_LAYOUT = 'SET_LAYOUT'
const SET_HISTORY = 'SET_HISTORY'

const initialState = {
  layout: 4,
  selectedReceiptIndex: 0,
  receipts: [[], [], [], []],
  history: [],
};

export function setLayout(payload) {
  return {
    type: SET_LAYOUT,
    payload
  }
}

export function setSelectedReceipt(payload) {
  return {
    type: SET_SELECTED_RECEIPT,
    payload
  }
}

export function setReceipts(payload) {
  return {
    type: SET_RECEIPTS,
    payload
  }
}

export function loadReceipts() {
  return async function (dispatch, getState) {
    try {
      const data = await API.getDayReceipts({
        date: '2020-06-11'
      })

      dispatch(setHistory(data.reverse()))
    } catch (error) {
      console.log(error)
    }
  };
}

export function setHistory(payload) {
  return {
    type: SET_HISTORY,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_LAYOUT]: (state, action) => {
    return {...state, layout: action.payload}
  },
  [SET_SELECTED_RECEIPT]: (state, action) => {
    return { ...state, selectedReceiptIndex: action.payload }
  },
  [SET_RECEIPTS]: (state, action) => {
    return { ...state, receipts: action.payload }
  },
  [SET_HISTORY]: (state, action) => {
    return { ...state, history: action.payload }
  },
};

export default function OrdersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
