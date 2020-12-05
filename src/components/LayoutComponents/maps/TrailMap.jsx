import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import FlagIcon from "@material-ui/icons/Flag";
export default function TrailMap({ trailInfo }) {
  //   const [clickedMapEvent, setClickedMapEvent] = useState({});
  //   const [showClickedMapEvent, setShowClickedMapEvent] = useState(false);
  //   const fetchedTrails = useSelector((state) => state.trail.trails);
  const [viewport, setViewport] = useState({
    latitude: trailInfo.latitude,
    longitude: trailInfo.longitude,
    width: "100%",
    height: "100%",
    zoom: 14,
  });

  return (
    <div
      className="map-wrapper"
      style={{
        width: "100%",
        height: "250px",
        // borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/balthazarely/ckg8fukiq14tk19mxrkt19zgv"}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          key={trailInfo.id}
          latitude={trailInfo.latitude}
          longitude={trailInfo.longitude}
        >
          <FlagIcon color="primary" style={{ fontSize: 40 }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}
