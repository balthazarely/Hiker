import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Components
import SideDrawer from "../components/SideDrawer";
import SearchContainer from "../components/Search/SearchContainer";
import TrailResults from "../components/TrailResults";
import EventMap from "../components/EventMap";

// Style
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";
import { clearTrails } from "../actions/TrailActions";

export default function Home() {
  const [coords, setCoords] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 40.015,
    longitude: -105.2705,
    width: "100%",
    height: "100%",
    zoom: 12,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearTrails());
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('MountainsBG.svg')",
        backgroundRepeat: " no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <motion.div
        style={{
          height: "100vh",
        }}
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* <div style={{ backgroundImage: "url('MountainsBG.svg')" }}>

</div> */}
        {/* <div style={{ backgroundImage: "url('mountains.jpg')" }}> */}
        {/* <img src="mountains.jpg" /> */}
        <Container>
          <SearchContainer
            setCoords={setCoords}
            coords={coords}
            setViewport={setViewport}
          />
          <TrailResults />
        </Container>
        {/* </div> */}
      </motion.div>
    </div>
  );
}
