import { asyncActionFinish, asyncActionStart } from "../reducers/asyncReducer";
let apiKey = process.env.REACT_APP_HIKEPROJECT_API_KEY;
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const fetchTrailsFromSearch = (lat, lng, address) => async (
  dispatch
) => {
  dispatch(asyncActionStart());
  const response = await fetch(
    `${PROXY_URL}https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${apiKey}&maxResults=100`
  );
  const json = await response.json();
  const finalArray = json.trails.filter(
    (x) => x.stars >= 3 && x.type !== "Connector"
  );
  console.log(json);
  dispatch({
    type: "FETCH_TRAILS",
    payload: {
      trails: finalArray,
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
