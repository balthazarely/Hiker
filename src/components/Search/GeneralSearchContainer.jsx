import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrailsFromSearch } from "../../actions/TrailActions";
import Search from "./Search";
import { Link } from "react-router-dom";

// Material UI
import { IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import GeneralSearch from "./GeneralSearch";

export default function GeneralSearchContainer() {
  const [coords, setCoords] = useState({});
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  return (
    <div
      className="flex-center"
      style={{
        height: "100px",
        // width: "100%",
        border: "2px solid blue",
        width: "200px",
        // width: "50%",
        // position: "absolute",
        // top: 100,
        // right: 0,
      }}
    >
      <div
        className="flex-center"
        style={{
          border: "2px solid red",

          // position: "absolute",
          // top: 100,
          // right: 0,
        }}
      >
        <GeneralSearch
          setCoords={setCoords}
          setAddress={setAddress}
          address={address}
        />

        <Link to={`/trails/&${coords.lat}&${coords.lng}&${address}`}>
          <IconButton
            aria-label="delete"
            // onClick={() =>
            //   dispatch(fetchTrailsFromSearch(coords.lat, coords.lng, address))
            // }
            size="small"
          >
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
