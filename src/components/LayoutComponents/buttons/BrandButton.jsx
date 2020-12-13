import React from "react";
import { Button } from "@material-ui/core";

const BrandButton = ({ color, children }) => {
  return (
    <div>
      <Button variant="contained" color={color}>
        {children}
      </Button>
    </div>
  );
};

export default BrandButton;
