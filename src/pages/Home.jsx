import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
//Components
import SearchContainer from "../components/Search/SearchContainer";
import TrailResults from "../components/TrailResults";
// Style
import Typography from "@material-ui/core/Typography";
import { Container, Button, CircularProgress } from "@material-ui/core/";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";
import { clearTrails, fetchTrailsFromSearch } from "../actions/TrailActions";

export default function Home() {
  const [location, setLocation] = useState({ city: "", state: "" });
  const [coords, setCoords] = useState({});

  const [geoCoords, setGeoCoords] = useState({});
  const [geoLocation, setGeoLocation] = useState({ city: "", state: "" });
  const [geoBtnVisible, setGeoBtnVisible] = useState(true);
  const [geoLoading, setGeoLoading] = useState(false);
  const { error } = useSelector((state) => state?.trail);

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
        // height: "100%",
        backgroundImage: "url('mountains-snow.jpg')",
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
          <Typography
            component="h1"
            variant="h4"
            style={{
              paddingTop: "100px",
              textAlign: "center",
            }}
          >
            Welcome to Hiker!
          </Typography>
          <Typography
            component="h1"
            variant="subtitle1"
            style={{
              textAlign: "center",
            }}
          >
            To start, search a city
          </Typography>
          <SearchContainer
            setCoords={setCoords}
            coords={coords}
            location={location}
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
            {error ? <Typography
              component="h1"
              variant="subtitle1"
              style={{
                textAlign: "center",
              }}
            >
           There was an error with your search. Please refresh and try again.
          </Typography> : null}
          </div>
        </Container>
      </motion.div>
    </div>
  );
}
