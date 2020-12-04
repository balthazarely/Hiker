const initialState = {
  trails: null,
  city: "",
  coordinates: null,
};

const trailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRAILS":
      return {
        ...state,
        trails: action.payload.trails,
        city: action.payload.city,
        coordinates: action.payload.coordinates,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        trails: [],
        city: [],
        coordinates: [],
      };

    default:
      return state;
  }
};

export default trailReducer;
