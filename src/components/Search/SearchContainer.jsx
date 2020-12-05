import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrailsFromSearch } from "../../actions/TrailActions";
import Search from "./Search";

// Material UI
import { IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function SearchContainer({ setCoords, coords, setViewport }) {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const formatAddress = (address) => {
    return address.split(",")[0];
  };

  return (
    <div className="flex-center" style={{ height: "200px" }}>
      <Search setCoords={setCoords} setAddress={setAddress} address={address} />
      <IconButton
        aria-label="delete"
        onClick={() =>
          dispatch(fetchTrailsFromSearch(coords.lat, coords.lng, address))
        }
        size="small"
      >
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}
