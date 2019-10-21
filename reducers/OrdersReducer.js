const SET_OPEN_ORDER = 'SET_OPEN_ORDERS';
const SET_SLIDE_INDEX = 'SET_SLIDE_INDEX';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_LAYOUT = 'SET_LAYOUT';
const SET_ACTIVE_SLIDE = 'SET_ACTIVE_SLIDE';
const SET_RECEIPTS = 'SET_RECEIPTS';

const initialState = {
  products: [],
  slideIndex: 0,
  layout: 4,
  activeSlide: 0,
};

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload
  }
}

export function setReceipts(payload){
  return {
    type: SET_RECEIPTS,
    payload
  }
}

export function setActiveSlide(payload) {
  return {
    type: SET_ACTIVE_SLIDE,
    payload
  }
}

export function setLayout(payload) {
  return {
    type: SET_LAYOUT,
    payload
  }
}

export function setOpenOrder(payload) {
  return {
    type: SET_OPEN_ORDER,
    payload
  }
}

export function setSlideIndex(payload) {
  return {
    type: SET_SLIDE_INDEX,
    payload
  }
}


const ACTION_HANDLERS = {
  [SET_OPEN_ORDER]: (state, action) => {
    const {receipts} = action.payload;

    return {...state, receipts}
  },
  [SET_PRODUCTS]: (state, action) => {
    return {...state, products: action.payload}
  },
  [SET_SLIDE_INDEX]: (state, action) => {
    return {...state, slideIndex: action.payload}
  },
  [SET_LAYOUT]: (state, action) => {
    return {...state, layout: action.payload}
  },
  [SET_ACTIVE_SLIDE]: (state, action) => {
    return {...state, activeSlide: action.payload}
  },
  [SET_RECEIPTS]: (state, action) => {
    return {...state, receipts: action.payload}
  },
};

export default function OrdersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
