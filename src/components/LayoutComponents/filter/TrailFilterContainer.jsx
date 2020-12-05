import React, { useState } from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Container,
  Button,
  Box,
} from "@material-ui/core";
import DistanceSlider from "../sliders/DistanceSlider";
import { makeStyles } from "@material-ui/core/styles";
import PageResultsButtons from "../buttons/PageResultsButtons";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginBottom: "20px",
  },
  gridWrapper: {
    display: "flex",
    border: "2px solid blue",
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-end",
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(1),
//     [theme.breakpoints.down("sm")]: {
//       backgroundColor: theme.palette.secondary.main,

//     },
//     [theme.breakpoints.up("md")]: {
//       backgroundColor: theme.palette.primary.main,
//     },
//     [theme.breakpoints.up("lg")]: {
//       backgroundColor: "rgba(0,255,0,1)",
//     },
//     gridWrapper: {
//       border: "2px solid blue",
//       direction: "row",
//       justify: "flex-end",
//       alignItems: "flex-end",
//     },
//   },
// }));

export default function TrailFilterContainer({
  sliderValue,
  setSliderValue,
  handleRadioChange,
  buttonResults,
  handleBtnChange,
}) {
  const classes = useStyles();

  return (
    <div style={{ margin: "30px 0" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Difficulty</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="all"
                control={<Radio color="primary" />}
                label="All"
                onChange={handleRadioChange}
              />
              <FormControlLabel
                value="easy"
                control={<Radio color="primary" />}
                label="Easy"
                onChange={handleRadioChange}
              />
              <FormControlLabel
                value="moderate"
                control={<Radio color="primary" />}
                label="Moderate"
                onChange={handleRadioChange}
              />
              <FormControlLabel
                value="hard"
                control={<Radio color="primary" />}
                label="Hard"
                onChange={handleRadioChange}
              />
            </RadioGroup>
          </FormControl>
          <DistanceSlider
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          item
          container

          // direction="row"
          // justify="flex-end"
          // alignItems="flex-end"
        >
          <BtnContainer>
            <PageResultsButtons
              handleBtnChange={handleBtnChange}
              buttonResults={buttonResults}
            />
          </BtnContainer>
        </Grid>
      </Grid>
    </div>
  );
}

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;
