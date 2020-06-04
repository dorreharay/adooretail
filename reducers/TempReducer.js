import { getFormattedDate, } from '@dateFormatter'
import { setReceipts } from './OrdersReducer'

const SET_END_OF_SESSION_STATUS = 'SET_END_OF_SESSION_STATUS';
const SET_ORIENTATION_DIMENSIONS = 'SET_ORIENTATION_DIMENSIONS'
const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE'
const SET_MODAL_STATUS = 'SET_MODAL_STATUS'
const SET_BLUETOOTH_DEVICES = 'SET_BLUETOOTH_DEVICES'
const SET_RESET_STATUS = 'SET_RESET_STATUS'

const initialState = {
  endOfSession: false,
  resetAccount: false,
  dimensions: {
    deviceWidth: 0,
    deviceHeight: 0,
  },
  currentRoute: 0,
  modalStatus: '',
  bluetoothDevices: {
    found: [],
    paired: [],
  },
  products: [],
};

export function setModalStatus(payload) {
  return {
    type: SET_MODAL_STATUS,
    payload
  }
}

export function setEndOfSessionStatus(payload) {
  return {
    type: SET_END_OF_SESSION_STATUS,
    payload
  }
}

export function setResetStatus(payload) {
  return {
    type: SET_RESET_STATUS,
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

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload
  }
}

export function setBluetoothDevices(payload) {
  return {
    type: SET_BLUETOOTH_DEVICES,
    payload
  }
}

export function addProductQuantity(payload) {
  return function (dispatch, getState) {
    const state = getState()

    const { selectedReceiptIndex, receipts, } = state.orders
    const product = payload

    let receipt = receipts[selectedReceiptIndex]

    const productExists = !!receipt.find(item => item.hash_id === product.hash_id)
  
    let newReceiptsInstance = []
  
    if (productExists) {
      newReceiptsInstance = receipt.map((item, index) => {
        if (item.hash_id === product.hash_id) {
          return ({ ...item, quantity: item.quantity + 1 })
        }
  
        return item
      })
    } else {
      let firstReceiptItem = {
        title: product.title,
        price: product.price,
        hash_id: product.hash_id,
        quantity: 1,
        size: product.size || null,
        time: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
        department: product.department,
      }
  
      newReceiptsInstance = [...receipt, firstReceiptItem]
    }
  
    const newReceipts = receipts.map((item, index) => index === selectedReceiptIndex ? newReceiptsInstance : item)
  
    dispatch(setReceipts(newReceipts))
  }
}

export function substractProductQuantity(payload) {
  return function (dispatch, getState) {
    const state = getState()

    const { selectedReceiptIndex, receipts, } = state.orders
    const product = payload

    let receipt = receipts[selectedReceiptIndex]
  
    let newReceiptsInstance = []
  
    if (product.quantity === 1) {
      newReceiptsInstance = receipt.filter((item, index) => item.hash_id !== product.hash_id)
    } else {
      newReceiptsInstance = receipt.map((item, index) => {
        if (item.hash_id === product.hash_id) {
          return ({ ...item, quantity: item.quantity - 1 })
        }

        return item
      })
    }
  
    const newReceipts = receipts.map((item, index) => index === selectedReceiptIndex ? newReceiptsInstance : item)
  
    dispatch(setReceipts(newReceipts))
  }
}

export function deleteCurrentReceiptItem(payload) {
  return function (dispatch, getState) {
    const state = getState()
    const receiptIndex = payload

    const { selectedReceiptIndex, receipts, } = state.orders

    const updatedReceipt = receipts[selectedReceiptIndex].filter((item, index) => index !== receiptIndex)
  
    const newReceipts = receipts.map((item, index) => index === selectedReceiptIndex ? updatedReceipt : item)
  
    dispatch(setReceipts(newReceipts))
  }
}

export function clearCurrentReceipt() {
  return function (dispatch, getState) {
    const state = getState()

    const { selectedReceiptIndex, receipts, } = state.orders
  
    const newReceipts = receipts.map((item, index) => index === selectedReceiptIndex ? [] : item)
  
    dispatch(setReceipts(newReceipts))
  }
}

const ACTION_HANDLERS = {
  [SET_END_OF_SESSION_STATUS]: (state, action) => {
    return { ...state, endOfSession: action.payload }
  },
  [SET_RESET_STATUS]: (state, action) => {
    return { ...state, resetAccount: action.payload }
  },
  [SET_ORIENTATION_DIMENSIONS]: (state, action) => {
    return { ...state, dimensions: action.payload }
  },
  [SET_CURRENT_ROUTE]: (state, action) => {
    return { ...state, currentRoute: action.payload }
  },
  [SET_MODAL_STATUS]: (state, action) => {
    return { ...state, modalStatus: action.payload }
  },
  [SET_BLUETOOTH_DEVICES]: (state, action) => {
    return { ...state, bluetoothDevices: action.payload }
  },
};

export default function TempReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
