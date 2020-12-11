import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Rating } from "@material-ui/lab";
import { fetchSingleTrailInfo } from "../../../actions/singleTrailAction";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { popUp } from "../../../animation/animation";
import {
  favoriteTrail,
  getUserFavoriteTrails,
  removeFavoriteTrailQuery,
} from "../../../firestore/firestoreService";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 200,
  },
  contents: {
    height: 190,
  },
});

export default function TrailCard({
  trailInfo,
  setModalOpen,
  favoriteTrailsFromFirebase,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [addingTrail, setAddingTrails] = useState("");
  const { currentUser } = useSelector((state) => state.auth);

  const handleCardClick = () => {
    dispatch(fetchSingleTrailInfo(trailInfo.id));
    setModalOpen(true);
  };

  console.log(favoriteTrailsFromFirebase);

  // const [userFavoriteTrails, setUserFavoriteTrails] = useState([]);
  // console.log(favoriteTrailsFromFirebase, "is is me");
  // const handleAddFavorite = (trailInfo, userId) => {
  //   // setAddingTrails(trailInfo.name);
  //   favoriteTrail(trailInfo, userId);
  // };

  const [alreadyFav, setAlreadyFav] = useState(false);
  useEffect(() => {
    checkIfFavorite();
  }, [favoriteTrailsFromFirebase]);

  const checkIfFavorite = () => {
    favoriteTrailsFromFirebase.map((item) => {
      if (item.trailId === trailInfo.id) {
        setAlreadyFav(true);
      }
    });
  };

  // useEffect(() => {
  //   getFavoriteTrailsFromFirebase();
  // }, []);

  // const getFavoriteTrailsFromFirebase = async () => {
  //   let favTrails = await getUserFavoriteTrails(currentUser);
  //   setUserFavoriteTrails(favTrails);
  //   console.log(favTrails);
  // };

  const textLimiter = (str) => {
    return str.length > 90 ? str.slice(0, 90) + "..." : str.slice(0, 90);
  };
  return (
    <Grid item xs={6} sm={4} md={4} lg={3}>
      <motion.div initial="hidden" animate="show">
        <motion.div variants={popUp} initial="hidden" animate="show">
          <Card className={classes.root}>
            <CardActionArea onClick={handleCardClick}>
              <CardMedia
                className={classes.media}
                image={trailInfo.imgSmall}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.contents}>
                <Typography gutterBottom variant="h7" component="h2">
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
                <Typography gutterBottom variant="body" component="body">
                  {textLimiter(trailInfo.summary)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {alreadyFav ? (
                <Button
                  size="small"
                  onClick={() => {
                    removeFavoriteTrailQuery(trailInfo.id, currentUser.uid);
                    checkIfFavorite();
                  }}
                >
                  Remove From Favorites
                </Button>
              ) : (
                <Button
                  size="small"
                  color="primary"
                  // disabled={alreadyFav ? true : false}
                  onClick={() => {
                    favoriteTrail(trailInfo, currentUser.uid);
                    checkIfFavorite();
                  }}
                >
                  Add To Favorites
                </Button>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </motion.div>
    </Grid>
  );
}
