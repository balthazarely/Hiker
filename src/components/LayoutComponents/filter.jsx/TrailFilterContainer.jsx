import { Grid } from "@material-ui/core";
import React from "react";
import DistanceSlider from "../sliders/DistanceSlider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "20px",
    width: "300px",
    border: "2px solid red",
  },
}));

export default function TrailFilterContainer({ sliderValue, setSliderValue }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <DistanceSlider
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </Grid>
  );
}
