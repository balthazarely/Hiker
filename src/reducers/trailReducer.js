const initialState = {
  trails: null,
  city: "",
  coordinates: null,
  error: true
};

const trailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRAILS":
      return {
        ...state,
        trails: action.payload.trails,
        city: action.payload.city,
        coordinates: action.payload.coordinates,
        error: false
      };
    case "CLEAR_DATA":
      return {
        ...state,
        trails: [],
        city: [],
        coordinates: [],
        error: false
      };
      case "FETCH_TRAILS_ERROR":
        return {
          ...state,
          trails: [],
          city: [],
          coordinates: [],
          error: true
        };

    default:
      return state;
  }
};

export default trailReducer;
