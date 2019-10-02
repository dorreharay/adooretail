const SET_OPEN_ORDER = 'SET_OPEN_ORDERS';
const SET_SLIDE_INDEX = 'SET_SLIDE_INDEX';

const initialState = {
  receipts: [],
  slideIndex: 0,
};

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
  [SET_SLIDE_INDEX]: (state, action) => {
    return {...state, slideIndex: action.payload}
  },
};

export default function OrdersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
