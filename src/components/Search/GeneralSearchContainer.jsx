import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrailsFromSearch } from "../../actions/TrailActions";
import Search from "./Search";
import { Link } from "react-router-dom";

// Material UI
import { Button } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import GeneralSearch from "./GeneralSearch";

export default function GeneralSearchContainer() {
  const [coords, setCoords] = useState({});
  const [address, setAddress] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const dispatch = useDispatch();
  return (
    <div
      // className="flex-center"
      style={{
        height: "100px",
        // width: "100%",
        width: "200px",

        // width: "50%",
        // position: "absolute",
        // top: 100,
        // right: 0,
      }}
    >
      <div
        // className="flex-center"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          // position: "absolute",
          // top: 100,
          // right: 0,
        }}
      >
        <GeneralSearch
          setCoords={setCoords}
          setAddress={setAddress}
          address={address}
          setSearchQ={setSearchQ}
        />

        <Link to={`/trails/&${coords.lat}&${coords.lng}&${address}`}>
          {searchQ ? (
            <Button variant="contained" color="primary" size="small">
              Search
            </Button>
          ) : null}
        </Link>
      </div>
    </div>
  );
}
