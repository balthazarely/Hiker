import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrailsFromSearch } from "../../actions/TrailActions";
import Search from "./Search";

// Styles
import { Button, IconButton } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";

export default function SearchContainer({
  setCoords,
  coords,
  getUserGeoLocation,
}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [searchQ, setSearchQ] = useState("");

  return (
    <div>
      <div
        className="center"
        style={{
          height: "200px",
          paddingTop: "50px",
        }}
      >
        <Search
          setSearchQ={setSearchQ}
          setCoords={setCoords}
          setAddress={setAddress}
          address={address}
          style={{ zIndex: 200000 }}
        />
        <div>
          {searchQ && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                if ((coords.lat, coords.lng, address)) {
                  dispatch(
                    fetchTrailsFromSearch(coords.lat, coords.lng, address)
                  );
                }
              }}
              size="small"
            >
              Search
            </Button>
          )}
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
