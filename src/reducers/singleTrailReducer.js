const initialState = {
  singleTrail: null,
};

const singleTrailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SINGLE_TRAIL":
      return {
        ...state,
        singleTrail: action.payload.singleTrail,
      };
    case "CLEAR_SINGLE_DATA":
      return {
        ...state,
        singleTrail: [],
      };

    default:
      return state;
  }
};
export default singleTrailReducer;
