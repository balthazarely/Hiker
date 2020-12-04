import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";

export default function EventMap({ viewport, setViewport }) {
  //   const [clickedMapEvent, setClickedMapEvent] = useState({});
  //   const [showClickedMapEvent, setShowClickedMapEvent] = useState(false);
  const fetchedTrails = useSelector((state) => state.trail.trails);
  return (
    <div className="map-wrapper" style={{ width: "500px", height: "500px" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/balthazarely/ckg8fukiq14tk19mxrkt19zgv"}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {fetchedTrails &&
          fetchedTrails.map((trail) => {
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
    </div>
  );
}
