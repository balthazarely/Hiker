import React from "react";
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
import { makeStyles } from "@material-ui/styles";
import { motion, AnimatePresence } from "framer-motion";
import { cardAnimation } from "../animation/animation";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 200,
  },
  contents: {
    minHeight: 190,
  },
});

export default function TrailResultsCard({ trailInfo }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={3}>
      <motion.div variants={cardAnimation} initial="hidden" animate="show">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={trailInfo.imgMedium}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.contents}>
              <Typography gutterBottom variant="h5" component="h2">
                {trailInfo.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
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
      </motion.div>
    </Grid>
  );
}
