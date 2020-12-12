import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrailsFromSearch } from "../../actions/TrailActions";
import Search from "./Search";
// Material UI
import { Button, IconButton } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function SearchContainer({
  setCoords,
  coords,
  getUserGeoLocation,
}) {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const formatAddress = (address) => {
    return address.split(",")[0];
  };

  return (
    <div>
      <div
        className="center"
        style={{
          height: "200px",
          paddingTop: "150px",
        }}
      >
        <Search
          setCoords={setCoords}
          setAddress={setAddress}
          address={address}
          style={{ zIndex: 200000 }}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={() =>
              dispatch(fetchTrailsFromSearch(coords.lat, coords.lng, address))
            }
            size="small"
          >
            Search
          </Button>
          <IconButton
            aria-label="delete"
            variant="contained"
            color="primary"
            onClick={getUserGeoLocation}
          >
            <MyLocationIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
