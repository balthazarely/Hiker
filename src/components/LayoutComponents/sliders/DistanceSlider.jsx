import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, FormLabel } from "@material-ui/core/";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ sliderValue, setSliderValue }) {
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <FormLabel component="legend"> Distance Range</FormLabel>

      <Slider
        style={{ width: "300px", marginRight: 0 }}
        value={sliderValue}
        min={0}
        max={30}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        // valueLabelDisplay="on"
      />
    </div>
  );
}
