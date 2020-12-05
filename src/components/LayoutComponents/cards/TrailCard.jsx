import React from "react";
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
import { Rating } from "@material-ui/lab";
import { fetchSingleTrailInfo } from "../../../actions/singleTrailAction";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { popUp } from "../../../animation/animation";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 200,
  },
  contents: {
    minHeight: 190,
  },
});

export default function TrailCard({ trailInfo, setModalOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(fetchSingleTrailInfo(trailInfo.id));
    setModalOpen(true);
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
                  {trailInfo.summary}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </motion.div>{" "}
      </motion.div>
    </Grid>
  );
}
