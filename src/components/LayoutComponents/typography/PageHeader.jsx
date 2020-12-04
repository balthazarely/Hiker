import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  content: {
    // marginTop: "10px",
    marginBottom: "30px",
  },
}));

export default function PageHeader({ children, marginTop }) {
  const classes = useStyles();

  return (
    <Typography
      variant="h4"
      component="h4"
      className={classes.content}
      style={{ marginTop: marginTop }}
    >
      {children}
    </Typography>
  );
}
