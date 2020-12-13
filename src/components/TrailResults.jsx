import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrailResultCard from "./TrailResultCard";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: "35px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btn: {
    marginTop: 20,
    // border: "2px solid red",
  },
}));

export default function TrailResults() {
  const classes = useStyles();
  const trailResults = useSelector((state) => state.trail.trails);
  const coordinates = useSelector((state) => state.trail.coordinates);
  const city = useSelector((state) => state.trail.city);
  const { loading } = useSelector((state) => state.async);

  console.log(city);
  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Grid container justify="center" spacing={2}>
            {trailResults &&
              trailResults.slice(0, 3).map((trailInfo) => {
                return (
                  <TrailResultCard key={trailInfo.id} trailInfo={trailInfo} />
                );
              })}
          </Grid>
          <div className="center">
            {trailResults?.length > 0 && trailResults !== null ? (
              <Link
                style={{ textDecoration: "none" }}
                to={`trails/&${coordinates?.latitude}&${coordinates?.longitude}&${city}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                >
                  More results
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
