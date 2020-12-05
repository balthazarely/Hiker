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
import SingleTrailModal from "../components/SingleTrailModal";

export default function TrailsPage() {
  const location = useLocation();
  let coordinates = location.pathname.split("&").slice(1);
  let trailLocation = coordinates[2];

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrails();
  }, []);

  const fetchTrails = (minDistance, maxDistance) => {
    dispatch(
      fetchTrailsFromSearch(
        convertToNum(coordinates[0]),
        convertToNum(coordinates[1]),
        trailLocation,
        minDistance,
        maxDistance
      )
    );
  };

  const { trails, city } = useSelector((state) => state.trail);
  const { loading } = useSelector((state) => state.async);
  // Slider Values
  const [sliderValue, setSliderValue] = useState([0.5, 20]);
  const [filterActive, setFilterActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //Dificulty filter
  const [radioValue, setRadioValue] = useState("");
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const trailFiltered = (trail) => {
    return trail;
    // if (radioValue === "") {
    //   let newTrails = trail;
    //   console.log(newTrails);
    //   return newTrails;
    // } else if (radioValue === "easy") {
    //   let newTrails = trail.filter((x) => {
    //     x.difficulty === "green";
    //   });
    //   console.log(newTrails);
    //   return newTrails;
    // }
  };

  return (
    <motion.div
    // variants={pageAnimation}
    // initial="hidden"
    // animate="show"
    // exit="exit"
    >
      <Container>
        <div className="flex-end">
          <GeneralSearchContainer />
        </div>
      </Container>
      {modalOpen ? <SingleTrailModal setModalOpen={setModalOpen} /> : null}
      <Container>
        {loading ? (
          <div
            style={{
              width: "100vw",
              border: "2px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {loading ? (
              <div style={{ border: "2px solid red" }}>
                <CircularProgress />
              </div>
            ) : (
              <PageHeader marginTop="20px"> {city}</PageHeader>
            )}

            <Typography variant="subtitle1" component="h4">
              {trails?.length} results
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchTrails(sliderValue[0], sliderValue[1])}
            >
              Filter
            </Button>
            {radioValue}
            <TrailFilter
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              handleRadioChange={handleRadioChange}
              radioValue={radioValue}
            />
            <Grid container justify="center" spacing={2}>
              {trails &&
                trailFiltered(trails).map((trailInfo) => {
                  return (
                    <TrailCard
                      key={trailInfo.id}
                      trailInfo={trailInfo}
                      setModalOpen={setModalOpen}
                    />
                  );
                })}
            </Grid>
          </motion.div>
        )}
        {/* <Link to="/">
          <Button variant="contained" color="primary">
            back
          </Button>
        </Link> */}
      </Container>
    </motion.div>
  );
}
