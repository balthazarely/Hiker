import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavDrawer from "./NavDrawer";
import { useHistory, Link } from "react-router-dom";
import { signOutFirebase } from "../../../firestore/firebaseService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: "white",
    width: "75px",
    height: "75px",
    zIndex: 50000000,
    marginTop: "12px",
    "&:hover": {
      background: "#07AEE9",
      color: "white",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { authenticated, currentUser } = useSelector((state) => state.auth);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            size="large"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {/* {authenticated ? <div>{currentUser.email}</div> : null} */}
        </Toolbar>
      </AppBar>
      <NavDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}
