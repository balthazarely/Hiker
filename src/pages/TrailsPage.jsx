import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core/";
import { Link, useLocation } from "react-router-dom";

//Components
import DistanceSlider from "../components/LayoutComponents/sliders/DistanceSlider";
import PageHeader from "../components/LayoutComponents/typography/PageHeader";
import TrailCard from "../components/LayoutComponents/cards/TrailCard";
import TrailsContainer from "../components/TrailPage/TrailsContainer";
import GeneralSearchContainer from "../components/Search/GeneralSearchContainer";

// Style
import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";
import { fetchTrailsFromSearch } from "../actions/TrailActions";
import { convertToNum } from "../utility/utility";
import TrailFilter from "../components/LayoutComponents/filter.jsx/TrailFilterContainer";

export default function TrailsPage() {
  const location = useLocation();
  let coordinates = location.pathname.split("&").slice(1);
  let trailLocation = coordinates[2];

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("us EFFECT going");
    dispatch(
      fetchTrailsFromSearch(
        convertToNum(coordinates[0]),
        convertToNum(coordinates[1]),
        trailLocation
      )
    );
  }, []);

  const { trails, city } = useSelector((state) => state.trail);
  const { loading } = useSelector((state) => state.async);
  // Slider Values
  const [sliderValue, setSliderValue] = useState([0.5, 20]);

  const trailFiltered = (trail) => {
    if (trails) {
      let newTrails = trail.filter(
        (x) => x.length > sliderValue[0] && x.length < sliderValue[1]
      );
      return newTrails;
    } else {
      return trails;
    }
  };

  return (
    <motion.div
    // variants={pageAnimation}
    // initial="hidden"
    // animate="show"
    // exit="exit"
    >
      <GeneralSearchContainer />
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <Typography variant="subtitle1" component="h4">
              {trails?.length} results
            </Typography>
            <PageHeader marginTop="10px"> {city}</PageHeader>
            <TrailFilter
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />

            <Grid container justify="center" spacing={2}>
              {trails &&
                trailFiltered(trails).map((trailInfo) => {
                  return <TrailCard key={trailInfo.id} trailInfo={trailInfo} />;
                })}
            </Grid>
          </motion.div>
        )}
        <Link to="/">
          <Button variant="contained" color="primary">
            back
          </Button>
        </Link>
      </Container>
    </motion.div>
  );
}
