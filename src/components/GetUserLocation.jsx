import React, { useEffect } from "react";
import Axios from "axios";

export default function GetUserLocation({ setLocation }) {
  const locatorButtonPressed = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddressFrom(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );

      const getAddressFrom = (lat, long) => {
        Axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDEn27GYmmHEz2tz-wNZJAfeqePlIP2_GI"
        )
          .then((response) => {
            if (response.data.error_message) {
              this.error = response.data.error_message;
              console.log(response.data.error_message);
            } else {
              console.log(response);
              setLocation({
                city: response.data.results[0].address_components[3].short_name,
                state: response.data.results[0].address_components[5].long_name,
              });
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    } else {
      console.log("your browser does not support GeoLocation API");
    }
  };

  useEffect(locatorButtonPressed, []);

  return <div></div>;
}
