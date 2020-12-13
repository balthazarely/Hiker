import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { motion } from "framer-motion";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signInUser } from "../actions/authActions";
import { registerInFirebase } from "../firestore/firebaseService";
import { pageAnimation } from "../animation/animation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "150px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterPage() {
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const submitRegForm = async (e) => {
    try {
      e.preventDefault();
      setShowError(false);
      await registerInFirebase(user);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError(err);
      setShowError(true);
    }
  };
  return (
    <motion.div
      style={{
        height: "100vh",
      }}
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitRegForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />{" "}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="display name"
              name="email"
              autoComplete="name"
              autoFocus
              onChange={(e) =>
                setUser({ ...user, displayName: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {showError && (
              <Typography variant="subtitle2" component="h4">
                {error?.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </motion.div>
  );
}
