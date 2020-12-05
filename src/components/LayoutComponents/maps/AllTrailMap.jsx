import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import { convertToNum } from "../../../utility/utility";
import FlagIcon from "@material-ui/icons/Flag";
import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export default function EventMap({ trails, coordinates }) {
  const [clickedTrail, setClickedTrail] = useState({});
  //   const [showClickedTrail, setShowClickedTrail] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: coordinates.length > 0 ? convertToNum(coordinates[0]) : 44,
    longitude: coordinates.length > 0 ? convertToNum(coordinates[1]) : -105,
    width: "100%",
    height: "100%",
    zoom: 11,
  });

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
                      onClick={(e) => {
                        e.preventDefault();
                        setClickedTrail(trail);
                        setPopUpOpen(true);
                      }}
                    >
                      <FlagIcon color="primary" style={{ fontSize: 30 }} />
                    </button>
                  </Marker>
                );
              }
            })}
          {popUpOpen ? (
            <Popup
              latitude={clickedTrail.latitude}
              longitude={clickedTrail.longitude}
              onClose={() => {
                setPopUpOpen(false);
              }}
            >
              <h4>{clickedTrail.name}</h4>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="h2"
                color="primary"
              >
                {clickedTrail.length} Miles
              </Typography>
              <Rating
                name="simple-controlled"
                value={clickedTrail.stars}
                size="small"
              />
            </Popup>
          ) : null}
        </ReactMapGL>
      ) : null}
    </div>
  );
}
