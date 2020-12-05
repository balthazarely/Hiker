import {
  asyncSingleTrailActionStart,
  asyncSingleTrailActionFinish,
} from "../reducers/asyncReducer";

let apiKey = process.env.REACT_APP_HIKEPROJECT_API_KEY;
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const fetchSingleTrailInfo = (id) => async (dispatch) => {
  dispatch(asyncSingleTrailActionStart());
  const singleTrailData = await fetch(
    `https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=${apiKey}`
  );
  const json = await singleTrailData.json();
  dispatch({
    type: "FETCH_SINGLE_TRAIL",
    payload: {
      singleTrail: json.trails[0],
    },
  });
  dispatch(asyncSingleTrailActionFinish());
};

export const clearSingleTrails = () => {
  return {
    type: "CLEAR_SINGLE_DATA",
  };
};
