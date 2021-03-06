import { asyncActionFinish, asyncActionStart } from "../reducers/asyncReducer";
let apiKey = process.env.REACT_APP_HIKEPROJECT_API_KEY;
// const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const fetchTrailsFromSearch = (lat, lng, address) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const response = await fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&key=${apiKey}&maxResults=30`);
    const json = await response.json();
    const filterArray = json.trails.filter((x) => x.stars >= 3 && x.type !== "Connector" );

    dispatch({
      type: "FETCH_TRAILS",
      payload: { trails: filterArray, city: address, coordinates: { latitude: lat, longitude: lng,},
      },
    });
    dispatch(asyncActionFinish());
  } catch(err) {
    dispatch({
      type: "FETCH_TRAILS_ERROR",
    });
    dispatch(asyncActionFinish());
  }
  
};

export const clearTrails = () => {
  return {
    type: "CLEAR_DATA",
  };
};
