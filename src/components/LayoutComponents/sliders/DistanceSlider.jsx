import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core/";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200,
    border: "2px solid red",
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ sliderValue, setSliderValue }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <Slider
      value={sliderValue}
      min={0}
      max={20}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
    />
  );
}
