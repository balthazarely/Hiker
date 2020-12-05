import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import { convertToNum } from "../../../utility/utility";

export default function EventMap({ trails, coordinates }) {
  const [viewport, setViewport] = useState({
    latitude: convertToNum(coordinates[0]),
    longitude: convertToNum(coordinates[1]),
    width: "100%",
    height: "100%",
    zoom: 11,
  });

  console.log(trails);

  return (
    <div
      className="map-wrapper"
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
    >
      {trails ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={"mapbox://styles/balthazarely/ckg8fukiq14tk19mxrkt19zgv"}
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {trails &&
            trails.map((trail) => {
              if (trail.latitude === null && trail.longitude === null) {
                return null;
              } else {
                return (
                  <Marker
                    key={trail.id}
                    latitude={trail.latitude}
                    longitude={trail.longitude}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        width: "40px",
                        height: "50px",
                        cursor: "pointer",
                        outline: "none",
                      }}
                      //   onClick={(e) => {
                      //     e.preventDefault();
                      //     clickedMapEvent(event);
                      //     setShowClickedMapEvent(true);
                      //   }}
                    >
                      <img src="beer.svg" alt="beer icon" />
                    </button>
                  </Marker>
                );
              }
            })}
        </ReactMapGL>
      ) : null}
    </div>
  );
}
