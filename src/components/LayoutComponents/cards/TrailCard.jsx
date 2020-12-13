import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import { toast } from 'react-toastify'

import { Rating } from "@material-ui/lab";
import { fetchSingleTrailInfo } from "../../../actions/singleTrailAction";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { popUp } from "../../../animation/animation";
import {
  addTrailToFirestoreLogFromResults,
  favoriteTrail,
} from "../../../firestore/firestoreService";
import HikeLogModal from "../modals/HikeLogModal";
import { convertToTimeStamp, textLimiter } from "../../../utility/utility";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 200,
  },
  contents: {
    height: 190,
  },
  header: {
    fontSize: "18px",
    fontWeight: 800,
    lineHeight: "20px",
  },
  subheader: {
    fontSize: "12px",
  },
});

export default function TrailCard({
  trailInfo,
  setModalOpen,
  authenticated,
  favoriteTrailsFromFirebase,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.auth);
  const [alreadyFav, setAlreadyFav] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);
  const [hikeDate, setHikeDate] = useState("");

  const handleCardClick = () => {
    dispatch(fetchSingleTrailInfo(trailInfo.id));
    setModalOpen(true);
  };

  const checkIfFavorite = () => {
    favoriteTrailsFromFirebase.map((item) => {
      if (item.trailId === trailInfo.id) {
        setAlreadyFav(true);
      }
    });
  };
  useEffect(() => {
    if (authenticated) {
      checkIfFavorite();
    }
  }, [favoriteTrailsFromFirebase]);

  const handleAddToLog = () => {
    if (hikeDate === "") {
      console.log("Error. Pls enter date");
    } else {
      setOpenLogModal(false);
      toast.info("Trail added to your log.")
      addTrailToFirestoreLogFromResults(trailInfo, currentUser.uid, convertToTimeStamp(hikeDate));
    }
  };

  const checkImageForBlank = (img) => {
    if (img === "") {
      return "/hike-placeholder.jpg";
    } else {
      return img;
    }
  };

  return (
    <Grid item xs={6} sm={4} md={4} lg={3}>
      <motion.div initial="hidden" animate="show">
        <motion.div variants={popUp} initial="hidden" animate="show">
          <HikeLogModal
            setOpenLogModal={setOpenLogModal}
            openLogModal={openLogModal}
            setHikeDate={setHikeDate}
            handleAddToLog={handleAddToLog}
            title="Add to Log"
          />
          <Card className={classes.root}>
            <CardActionArea onClick={handleCardClick}>
              <CardMedia
                className={classes.media}
                image={checkImageForBlank(trailInfo.imgSmall)}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.contents}>
                <Typography
                  gutterBottom
                  className={classes.header}
                  component="h2"
                >
                  {trailInfo.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h2"
                  color="primary"
                >
                  {trailInfo.length} Miles
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={trailInfo.stars}
                  size="small"
                />
                <Typography gutterBottom className={classes.subheader}>
                  {textLimiter(trailInfo.summary)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {authenticated && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    disabled={alreadyFav ? true : false}
                    onClick={() => {
                      favoriteTrail(trailInfo, currentUser.uid);
                      checkIfFavorite();
                    }}
                  >
                    Add Favorite
                  </Button>
                  <Button
                    onClick={() => setOpenLogModal(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<DirectionsWalkIcon />}
                  >
                    Log
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </motion.div>
    </Grid>
  );
}
