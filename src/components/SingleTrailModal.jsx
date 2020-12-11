import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Card, CardMedia, Divider, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { dispatch } from "rxjs/internal/observable/pairs";
import TrailMap from "./LayoutComponents/maps/TrailMap";
import {
  dataFromSnapshot,
  favoriteTrail,
  getTrailsFromFirestore,
  removeFavoriteTrailQuery,
} from "../firestore/firestoreService";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "10px",
    position: "relative",
  },
  t: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 300,
  },
});

export default function SingleTrailModal({
  setModalOpen,
  pathId,
  favoriteTrailsFromFirebase,
}) {
  const { loadingSingle } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      setModalOpen(false);
    }
  };

  const trailInfo = useSelector((state) => state.singleTrail.singleTrail);
  // console.log(favoriteTrailsFromFirebase);
  console.log(currentUser);

  const difficultyConverter = (str) => {
    switch (str) {
      case "green":
        return " Very easy";
      case "greenBlue":
        return " Easy";
      case "blue":
        return " Moderate";
      case "blueBlack":
        return " Hard";
      case "black":
        return " Very hard";
    }
  };

  // const [userFavoriteTrails, setUserFavoriteTrails] = useState([]);
  // console.log(favoriteTrailsFromFirebase, "is is me");
  const handleAddFavorite = (trailInfo, userId) => {
    // setAddingTrails(trailInfo.name);
    // favoriteTrail(trailInfo, userId);
  };

  const [alreadyFav, setAlreadyFav] = useState(false);

  useEffect(() => {
    if (trailInfo && trailInfo.id !== null) {
      checkIfFavorite();
    }
  });

  const checkIfFavorite = () => {
    favoriteTrailsFromFirebase.map((item) => {
      if (item.trailId === trailInfo.id) {
        console.log("WE HAVE A MATCH");
        setAlreadyFav(true);
      }
    });
  };

  const classes = useStyles();
  return (
    <CardShadow className="shadow" onClick={exitDetailHandler}>
      <Detail
      // layoutId={pathId}
      >
        {loadingSingle ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={trailInfo.imgMedium}
              title="Contemplative Reptile"
            />
            {trailInfo.stars >= 4.6 ? (
              <IconWrapper>
                <h4>RECOMMENDED TRAIL</h4>
                <FavoriteIcon color="primary">add_circle</FavoriteIcon>
              </IconWrapper>
            ) : null}
            <CardContent>
              <CardHeader>
                <Typography variant="h5" component="h5">
                  {trailInfo.name}
                </Typography>
                <RatingWrapper>
                  <Rating
                    name="simple-controlled"
                    value={trailInfo.stars}
                    size="small"
                  />
                </RatingWrapper>
              </CardHeader>
              <Typography variant="subtitle1" component="subtitle1">
                {trailInfo.location}
              </Typography>
              <br />

              {/* {alreadyFav ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    removeFavoriteTrailQuery(trailInfo.id, currentUser.uid);
                    checkIfFavorite();
                  }}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    favoriteTrail(trailInfo, currentUser.uid);
                    checkIfFavorite();
                  }}
                >
                  Add to Favorites
                </Button>
              )} */}

              <Typography variant="subtitle2" component="subtitle2">
                {trailInfo.length} Miles | Difficulty:
                {difficultyConverter(trailInfo.difficulty)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {trailInfo.summary}
              </Typography>
              <Infomation>
                <div>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                  >
                    Ascent: <span>{trailInfo.ascent} ft.</span>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                  >
                    Descent: <span>{trailInfo.descent} ft.</span>
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                  >
                    High: <span>{trailInfo.high} ft.</span>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                  >
                    Low: <span>{trailInfo.low} ft.</span>
                  </Typography>
                </div>
              </Infomation>
              <MapContainer>
                <TrailMap trailInfo={trailInfo} />
              </MapContainer>
            </CardContent>
          </Card>
        )}
      </Detail>
    </CardShadow>
  );
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 5000;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const LoadingContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const Detail = styled(motion.div)`
  width: 95%;
  max-width: 700px;
  /* border-radius: 1rem;
  padding: 1rem; */
  /* background: white; */
  position: absolute;
  /* color: black; */
  z-index: 10;
  img {
    width: 100%;
  }
`;

const CardHeader = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;
const RatingWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid white;
  background: white;
  padding: 3px 8px;
  border-radius: 6px;
  margin: 12px;
  h4 {
    color: black;
    margin-top: 4px;
    font-size: 12px;
  }
`;
const MapContainer = styled(motion.div)`
  /* margin-top: 40px; */
`;
const Infomation = styled(motion.div)`
  margin: 10px 0;
  max-width: 60%;
  display: flex;
  flex-direction: row;
  div {
    margin-right: 10px;
  }
  span {
    font-weight: 800;
  }
  /* justify-content: space-between; */
`;
