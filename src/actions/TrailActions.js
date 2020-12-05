import { asyncActionFinish, asyncActionStart } from "../reducers/asyncReducer";
let apiKey = process.env.REACT_APP_HIKEPROJECT_API_KEY;
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const fetchTrailsFromSearch = (
  lat,
  lng,
  address,
  minDistance = 0,
  maxDistance = 30
) => async (dispatch) => {
  dispatch(asyncActionStart());
  const response = await fetch(
    `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&key=${apiKey}&maxResults=20`
  );
  const json = await response.json();
  const filterArray = json.trails.filter(
    (x) =>
      x.stars >= 3 &&
      x.type !== "Connector" &&
      x.length < maxDistance &&
      x.length > minDistance
  );

  console.log(json);
  dispatch({
    type: "FETCH_TRAILS",
    payload: {
      trails: filterArray,
      city: address,
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
    },
  });
  dispatch(asyncActionFinish());
};

export const clearTrails = () => {
  return {
    type: "CLEAR_DATA",
  };
};
// green, greenBlue, blue, blueBlack, black;
