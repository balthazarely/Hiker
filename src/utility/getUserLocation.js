import React, { useEffect } from "react";

export default function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }
}
