let apiKey = process.env.REACT_APP_HIKEPROJECT_API_KEY;
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const searchHikingTrails = async (lat, lng) => {
  const response = await fetch(
    `${PROXY_URL}https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${apiKey}&maxResults=20`
  );
  const json = await response.json();
  return json.trails;
};
