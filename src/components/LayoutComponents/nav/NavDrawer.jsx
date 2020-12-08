import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

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

  const list = () => (
    <div className={clsx(classes.list)}>
      <List>
        <Link to="/">
          <ListItem button key="search">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="search" />
          </ListItem>
        </Link>
        <Link to="/trails/&49.2827291&-123.1207375&Vancouver,%20BC,%20Canada">
          <ListItem button key="trail">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="trail" />
          </ListItem>
        </Link>{" "}
        <Link to="/trails/&39.1910983&-106.8175387&Aspen,%20CO,%20USA">
          <ListItem button key="trail2">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="trail2" />
          </ListItem>
        </Link>
        <Link to="/user">
          <ListItem button key="user">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="user" />
          </ListItem>
        </Link>
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
