
const SET_SELECTED_RECEIPT = 'SET_SELECTED_RECEIPT'
const SET_RECEIPTS = 'SET_RECEIPTS'
const SET_LAYOUT = 'SET_LAYOUT'

const initialState = {
  layout: 4,
  selectedReceiptIndex: 0,
  receipts: [[], [], [], []],
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
};

export default function OrdersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
