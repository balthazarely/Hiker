import React, { useState } from "react";
import { Button, FormLabel } from "@material-ui/core";
export default function PageResultsButtons({ buttonResults, handleBtnChange }) {
  return (
    <div>
      <FormLabel component="legend"> Results</FormLabel>

      <Button
        variant={buttonResults === 10 ? "contained" : "outlined"}
        size="small"
        color="primary"
        value="10"
        disableElevation
        onClick={() => handleBtnChange(10)}
      >
        10
      </Button>
      <Button
        variant={buttonResults === 20 ? "contained" : "outlined"}
        size="small"
        color="primary"
        value="20"
        disableElevation
        onClick={() => handleBtnChange(20)}
      >
        25
      </Button>
      <Button
        variant={buttonResults === 50 ? "contained" : "outlined"}
        size="small"
        color="primary"
        value="50"
        disableElevation
        onClick={() => handleBtnChange(50)}
      >
        50
      </Button>
    </div>
  );
}
