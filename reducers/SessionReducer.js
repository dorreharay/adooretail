const CREATE_SESSION = 'CREATE_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';

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
              ...action.payload.summary
            }
          };
        }

        return session
      }),
    };
  },
};

export default function SessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
