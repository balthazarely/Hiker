import React, { useState } from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import DistanceSlider from "../sliders/DistanceSlider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "20px",
    width: "300px",
    border: "2px solid red",
  },
}));

export default function TrailFilterContainer({
  sliderValue,
  setSliderValue,
  handleRadioChange,
  radioValue,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <DistanceSlider
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={radioValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="easy" control={<Radio />} label="easy" />
          <FormControlLabel
            value="moderate"
            control={<Radio />}
            label="moderate"
          />
          <FormControlLabel
            value="difficult"
            control={<Radio />}
            label="difficult"
          />
        </RadioGroup>
      </FormControl> */}
    </Grid>
  );
}
