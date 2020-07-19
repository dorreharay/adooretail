
import { getFormattedDate, } from '@dateFormatter'
import API from '../httpClient/api'

const SET_SELECTED_RECEIPT = 'SET_SELECTED_RECEIPT'
const SET_RECEIPTS = 'SET_RECEIPTS'
const SET_LAYOUT = 'SET_LAYOUT'
const SET_HISTORY = 'SET_HISTORY'
const SET_DETAILS = 'SET_DETAILS'
const SET_RECEIPT_EDIT = 'SET_RECEIPT_EDIT'
const SET_EDITED_RECEIPT_ID = 'SET_EDITED_RECEIPT_ID'
const SET_EDITED_RECEIPT_PAYLOAD = 'SET_EDITED_RECEIPT_PAYLOAD'
const SET_RECEIPT_IDS = 'SET_RECEIPT_IDS'
const SET_PRE_RECEIPTS = 'SET_PRE_RECEIPTS'

const initialState = {
  layout: 4,
  selectedReceiptIndex: 0,
  receipts: [[], [], [], []],
  receiptsIds: [null, null, null, null],
  receiptsPreStates: [],
  history: [],
  details: null,
  updateModeData: null,
  editedReceiptId: null,
  editedReceiptPayload: null,
};

export function savePreReceipt(status) {
  return function (dispatch, getState) {
    const state = getState()
    const { receiptsPreStates, receiptsIds, selectedReceiptIndex, } = state.orders
    const currentId = receiptsIds[selectedReceiptIndex]

    const hasDuplicate = receiptsPreStates.find(item => item.hash_id === currentId.hash_id)

    let newPreState = hasDuplicate ? receiptsPreStates.map(item => item.hash_id === currentId ? ({ ...item, status }) : item) : [...receiptsPreStates, { hash_id: currentId, status, }]
        newPreState = newPreState.filter(item => !!item.hash_id)
        newPreState = [...new Map(newPreState.map(item => [item['hash_id'], item])).values()]
  
    dispatch(setPreReceipts(newPreState))
  }
}

export function setPreReceipts(payload) {
  return {
    type: SET_PRE_RECEIPTS,
    payload,
  }
}

export function generateCurrentReceiptId() {
  return function (dispatch, getState) {
    const state = getState()
    const { selectedReceiptIndex, receiptsIds, } = state.orders

    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    
    const newIds = receiptsIds.map((item, index) => selectedReceiptIndex === index ? guidGenerator() : item)
  
    dispatch(setReceiptIds(newIds))
  }
}

export function removeCurrentReceiptId() {
  return function (dispatch, getState) {
    const state = getState()
    const { selectedReceiptIndex, receiptsIds, } = state.orders
    
    const newIds = receiptsIds.map((item, index) => selectedReceiptIndex === index ? null : item)
  
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

export function setReceiptEditState(payload) {
  return {
    type: SET_RECEIPT_EDIT,
    payload
  }
}

export function setEditedReceiptId(payload) {
  return {
    type: SET_EDITED_RECEIPT_ID,
    payload
  }
}

export function setEditedReceiptPayload(payload) {
  return {
    type: SET_EDITED_RECEIPT_PAYLOAD,
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
    const historyParams = getState().temp.historyParams

    try {
      const data = await API.getDayReceipts({
        date: historyParams.date,
        sort: historyParams.sort,
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

export function loadDetails() {
  return async function (dispatch, getState) {
    const historyParams = getState().temp.historyParams

    try {
      const data = await API.getDayDetails({
        date: historyParams.date
      })

      dispatch(setDetails(data))
    } catch (error) {
      console.log(error)
    }
  };
}

export function setDetails(payload) {
  return {
    type: SET_DETAILS,
    payload
  }
}

const ACTION_HANDLERS = {
  [SET_PRE_RECEIPTS]: (state, action) => {
    return {...state, receiptsPreStates: action.payload}
  },
  [SET_RECEIPT_IDS]: (state, action) => {
    return {...state, receiptsIds: action.payload}
  },
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
  [SET_DETAILS]: (state, action) => {
    return { ...state, details: action.payload }
  },
  [SET_RECEIPT_EDIT]: (state, action) => {
    return { ...state, updateModeData: action.payload }
  },
  [SET_EDITED_RECEIPT_ID]: (state, action) => {
    return { ...state, editedReceiptId: action.payload }
  },
  [SET_EDITED_RECEIPT_PAYLOAD]: (state, action) => {
    return { ...state, editedReceiptPayload: action.payload }
  },
};

export default function OrdersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
