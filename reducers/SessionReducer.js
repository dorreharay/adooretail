const CREATE_SESSION = 'CREATE_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';
const SAVE_RECEIPT_DATA = 'SAVE_RECEIPT_DATA';
const DELETE_SYNCED_SESSIONS = 'DELETE_SYNCED_SESSIONS';
const SAVE_TRANSACTION_DATA = 'SAVE_TRANSACTION_DATA';

const initialState = {
  list: [],
};

export function createSession(payload) {
  return {
    type: CREATE_SESSION,
    payload,
  };
}

export function updateSession(payload) {
  return {
    type: UPDATE_SESSION,
    payload,
  };
}

export function saveReceiptData(payload) {
  return {
    type: SAVE_RECEIPT_DATA,
    payload,
  };
}

export function deleteSyncedSessions(payload) {
  return {
    type: DELETE_SYNCED_SESSIONS,
    payload,
  };
}

export function saveTransactionData(payload) {
  return {
    type: SAVE_TRANSACTION_DATA,
    payload,
  };
}

const ACTION_HANDLERS = {
  [CREATE_SESSION]: (state, action) => {
    return { ...state, list: [...state?.list, action.payload] };
  },
  [UPDATE_SESSION]: (state, action) => {
    return {
      ...state,
      list: state?.list?.map(session => {
        if (session?.session_id === action.payload.session_id) {
          return {
            ...session,
            ...action.payload,
            summary: {
              ...session.summary,
              ...action.payload.summary,
            },
          };
        }

        return session;
      }),
    };
  },
  [SAVE_RECEIPT_DATA]: (state, action) => {
    return {
      ...state,
      list: state?.list?.map(session => {
        if (session?.session_id === action.payload.session_id) {
          return {
            ...session,
            receipts: [
              ...session.receipts,
              action.payload
            ]
          };
        }

        return session;
      }),
    };
  },
  [DELETE_SYNCED_SESSIONS]: (state, action) => {
    return {
      ...state,
      list: state?.list?.filter(session => !!session).filter(session => !action.payload.includes(session?.session_id)),
    };
  },
  [SAVE_TRANSACTION_DATA]: (state, action) => {
    return {
      ...state,
      list: state?.list?.map(session => {
        if (session?.session_id === action.payload.session_id) {
          return {
            ...session,
            transactions: [
              ...session.transactions,
              action.payload
            ]
          };
        }

        return session;
      }),
    };
  },
};

export default function SessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
