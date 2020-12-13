import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Divider from "@material-ui/core/Divider";
import { signOutFirebase } from "../../../firestore/firebaseService";

import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function NavDrawer({ drawerOpen, setDrawerOpen }) {
  const classes = useStyles();
  const { authenticated, currentUser } = useSelector((state) => state?.auth);

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
      // history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const linkStyle = {
    textDecoration: "none",
  };

  const textStyle = {
    color: "black",
  };

  const list = () => (
    <div className={clsx(classes.list)}>
      <List>
        <Link to="/" style={linkStyle}>
          <ListItem button key="search" onClick={() => setDrawerOpen(false)}>
            <ListItemIcon>
              <FilterHdrIcon />
            </ListItemIcon>
            <ListItemText primary="Search Trails" style={textStyle} />
          </ListItem>
        </Link>

        <Link
          style={linkStyle}
          to="/trails/&39.7392358&-104.990251&Denver,%20CO,%20USA"
        >
          <ListItem button onClick={() => setDrawerOpen(false)} key="trail2">
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText style={textStyle} primary="Denver Trails" />
          </ListItem>
        </Link>
        <Link style={linkStyle} to={`/profile`}>
          <ListItem button onClick={() => setDrawerOpen(false)} key="user">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText style={textStyle} primary="My Profile" />
          </ListItem>
        </Link>
        <Divider />
        {authenticated ? (
          <Link style={linkStyle} to={`/login`}>
            <ListItem button onClick={() => setDrawerOpen(false)} key="Logout">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                style={textStyle}
                primary="Logout"
                onClick={handleSignOut}
              />
            </ListItem>
          </Link>
        ) : (
          <Link style={linkStyle} to={`/login`}>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              key="Login/Register"
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText style={textStyle} primary="Login/Register" />
            </ListItem>
          </Link>
        )}
        <ListItem
          button
          onClick={() => setDrawerOpen(false)}
          key="Login/Register"
        >
          {authenticated ? <div>Signed in as {currentUser.email}</div> : null}

          {/* <ListItemText style={textStyle} primary="Login/Register" /> */}
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
