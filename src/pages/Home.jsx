import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

//Components
import SideDrawer from "../components/SideDrawer";
import SearchContainer from "../components/Search/SearchContainer";
import TrailResults from "../components/TrailResults";
import EventMap from "../components/EventMap";

// Style
import Typography from "@material-ui/core/Typography";
import { Container, Button, CircularProgress } from "@material-ui/core/";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";
import { clearTrails, fetchTrailsFromSearch } from "../actions/TrailActions";
import GetUserLocation from "../components/GetUserLocation";
// import GetUserLocation from "../components/GetUserLocation";

export default function Home() {
  const [location, setLocation] = useState({ city: "", state: "" });
  const [coords, setCoords] = useState({});

  const [geoCoords, setGeoCoords] = useState({});
  const [geoLocation, setGeoLocation] = useState({ city: "", state: "" });
  const [geoBtnVisible, setGeoBtnVisible] = useState(true);
  const [geoLoading, setGeoLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearTrails());
  }, []);

  const getUserGeoLocation = () => {
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      getAddressFrom(position.coords.latitude, position.coords.longitude)
        .then(() => {
          setGeoCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        })
        .then(() => {
          setGeoLoading(false);
        });
    });

    const getAddressFrom = async (lat, long) => {
      let apiData = await Axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key=AIzaSyDEn27GYmmHEz2tz-wNZJAfeqePlIP2_GI"
      );
      await setGeoLocation({
        city: apiData.data.results[0].address_components[3].short_name,
        state: apiData.data.results[0].address_components[5].long_name,
      });
    };
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('MountainsBG.svg')",
        backgroundRepeat: " no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <motion.div
        style={{
          height: "100vh",
        }}
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Container>
          <SearchContainer
            setCoords={setCoords}
            coords={coords}
            location={location}
            // setViewport={setViewport}
            getUserGeoLocation={getUserGeoLocation}
          />
          <TrailResults />
          <div
            className="center"
            style={{
              paddingTop: "100px",
            }}
          >
            {geoLocation.city && geoBtnVisible ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setGeoBtnVisible(false);
                  dispatch(
                    fetchTrailsFromSearch(
                      geoCoords.latitude,
                      geoCoords.longitude,
                      geoLocation.city
                    )
                  );
                }}
              >
                {geoLocation.city}, {geoLocation.state}
              </Button>
            ) : null}
            {geoLoading ? <CircularProgress /> : null}
          </div>
        </Container>
      </motion.div>
      {geoLocation.city} {geoCoords.latitude} {geoCoords.longitude}
      {geoLoading ? "true" : "false"}
    </div>
  );
}
