import React from "react";
import { Button, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { deepPurple, amber } from "@material-ui/core/colors";

const BrandButton = ({ color, children }) => {
  // this `classes` prop is made available by using withStyles below
  // I've left out Grid components below to make this easier to read

  return (
    <div>
      <Button variant="contained" color={color}>
        {children}
      </Button>
    </div>
  );
};

export default BrandButton;
