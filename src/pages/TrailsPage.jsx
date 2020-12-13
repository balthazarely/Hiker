import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CircularProgress,
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core/";
import { useLocation } from "react-router-dom";

import PageHeader from "../components/LayoutComponents/typography/PageHeader";
import TrailCard from "../components/LayoutComponents/cards/TrailCard";
import GeneralSearchContainer from "../components/Search/GeneralSearchContainer";
import AllTrailMap from "../components/LayoutComponents/maps/AllTrailMap";
import TrailFilter from "../components/LayoutComponents/filter/TrailFilterContainer";
import SingleTrailModal from "../components/SingleTrailModal";
import {
  dataFromSnapshot,
  getTrailsFromFirestore,
} from "../firestore/firestoreService";

import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";
import { fetchTrailsFromSearch } from "../actions/TrailActions";
import { convertToNum } from "../utility/utility";

export default function TrailsPage() {
  const location = useLocation();
  let coordinates = location.pathname.split("&").slice(1);
  let trailLocation = coordinates[2];
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.auth);
  const { authenticated } = useSelector((state) => state?.auth);
  const { trails, city } = useSelector((state) => state.trail);
  const { loading } = useSelector((state) => state.async);

  //Hooks
  const [favoriteTrailsFromFirebase, setFavoriteTrailsFromFirebase] = useState(
    []
  );
  const [sliderValue, setSliderValue] = useState([0.5, 30]);
  const [modalOpen, setModalOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("");

  useEffect(() => {
    if (coordinates.length === 0) {
      console.log("not gonna fetch");
    } else {
      fetchTrails();
    }
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

  useEffect(() => {
    if (authenticated) {
      const unsubscribe = getTrailsFromFirestore(currentUser.uid, {
        next: (snapshot) => {
          let trails = snapshot.docs.map((docSnap) =>
            dataFromSnapshot(docSnap)
          );
          setFavoriteTrailsFromFirebase(trails);
        },
        error: (error) => console.log(error),
      });
      return unsubscribe;
    }
  }, []);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  // Page results
  const [buttonResults, setButtonResults] = useState(10);
  const handleBtnChange = (value) => {
    setButtonResults(value);
  };

  // Dificulty Filter
  const trailFiltered = (trail) => {
    let filtertedTrail;
    if (radioValue === "all") {
      filtertedTrail = trail;
    } else if (radioValue === "easy") {
      filtertedTrail = trail.filter(
        (x) =>
          x.difficulty === "green" ||
          x.difficulty === "greenBlue" ||
          x.difficulty === "blue"
      );
    } else if (radioValue === "moderate") {
      filtertedTrail = trail.filter((x) => x.difficulty === "blueBlack");
    } else if (radioValue === "hard") {
      filtertedTrail = trail.filter(
        (x) => x.difficulty === "black" || x.difficulty === "dblack"
      );
    } else {
      filtertedTrail = trail;
    }
    return filtertedTrail
      .slice(0, buttonResults)
      .filter((x) => x.length > sliderValue[0] && x.length < sliderValue[1]);
  };

  // Get location
  const pathId = location.pathname.split("/")[2];

  return (
    <Grid container>
      <Grid item md={8} xs={12} sm={12}>
        <motion.div>
          <Container>
            <div className="flex-end" style={{ marginTop: "100px" }}>
              {loading ? null : <GeneralSearchContainer />}
            </div>
          </Container>

          {modalOpen ? (
            <SingleTrailModal
              setModalOpen={setModalOpen}
              pathId={pathId}
              favoriteTrailsFromFirebase={favoriteTrailsFromFirebase}
            />
          ) : null}

          <Container>
            {loading ? (
              <div
                style={{
                  width: "100vw",
                  height: "40vh",
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
                  <CircularProgress />
                ) : (
                  <div>
                    <Typography variant="subtitle1" component="h4">
                      {trails?.length} results
                    </Typography>

                    <PageHeader> {city}</PageHeader>
                  </div>
                )}

                <TrailFilter
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                  handleRadioChange={handleRadioChange}
                  buttonResults={buttonResults}
                  handleBtnChange={handleBtnChange}
                />
                <Grid container justify="center" spacing={2}>
                  {trails &&
                    trailFiltered(trails).map((trailInfo) => {
                      return (
                        <TrailCard
                          key={trailInfo.id}
                          trailInfo={trailInfo}
                          setModalOpen={setModalOpen}
                          favoriteTrailsFromFirebase={
                            favoriteTrailsFromFirebase
                          }
                          authenticated={authenticated}
                        />
                      );
                    })}
                </Grid>
              </motion.div>
            )}
          </Container>
        </motion.div>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <Hidden smDown>
          {loading ? null : (
            <motion.div
              variants={pageAnimation}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <AllTrailMap
                trails={trails ? trailFiltered(trails) : null}
                coordinates={coordinates}
                className="map-wrapper"
              />
            </motion.div>
          )}
        </Hidden>
      </Grid>
    </Grid>
  );
}
