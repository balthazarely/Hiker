import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import FlagIcon from "@material-ui/icons/Flag";

export default function TrailMap({ trailInfo }) {
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
