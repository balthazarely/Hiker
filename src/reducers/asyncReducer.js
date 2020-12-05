const ASYNC_ACTION_START = "ASYNC_ACTION_START";
const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
const ASYNC_SINGLE_TRAIL_ACTION_START = "ASYNC_SINGLE_TRAIL_ACTION_START";
const ASYNC_SINGLE_TRAIL_ACTION_FINISH = "ASYNC_SINGLE_TRAIL_ACTION_FINISH";
const ASYNC_SINGLE_TRAIL_ACTION_ERROR = "ASYNC_SINGLE_TRAIL_ACTION_ERROR";

export function asyncActionStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}
export function asyncActionFinish() {
  return {
    type: ASYNC_ACTION_FINISH,
  };
}
export function asyncActionError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  };
}

export function asyncSingleTrailActionStart() {
  return {
    type: ASYNC_SINGLE_TRAIL_ACTION_START,
  };
}
export function asyncSingleTrailActionFinish() {
  return {
    type: ASYNC_SINGLE_TRAIL_ACTION_FINISH,
  };
}
export function asyncSingleTrailActionError(error) {
  return {
    type: ASYNC_SINGLE_TRAIL_ACTION_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  loadingSingle: false,
  error: null,
};

export default function asyncReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };

    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ASYNC_SINGLE_TRAIL_ACTION_START:
      return {
        ...state,
        loadingSingle: true,
        error: null,
      };
    case ASYNC_SINGLE_TRAIL_ACTION_FINISH:
      return {
        ...state,
        loadingSingle: false,
      };

    case ASYNC_SINGLE_TRAIL_ACTION_ERROR:
      return {
        ...state,
        loadingSingle: false,
        error: payload,
      };

    default:
      return state;
  }
}
