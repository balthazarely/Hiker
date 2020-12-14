import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import { toast } from 'react-toastify'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  updateFirestoreLog,
  removeTrailFirestoreLog,
} from "../../../firestore/firestoreService";
import HikeLogModal from "../modals/HikeLogModal";
import { timeStampToDate } from "../../../utility/utility";

const useStyles = makeStyles({
  root: {
    margin: "5px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  media: {
  },
  contents: {
    width: "100%",
  },
  header: {
    fontSize: "18px",
    fontWeight: 800,
    lineHeight: "20px",
  },
  subheader: {
    fontSize: "12px",
  },
});

export default function HikeLogCard({ trail, currentUser }) {
  const classes = useStyles();
  const [openLogModal, setOpenLogModal] = useState(false);
  const [hikeDate, setHikeDate] = useState("");

  const handleAddToLog = () => {
    setOpenLogModal(false);
    console.log(trail, currentUser.uid, hikeDate);
    updateFirestoreLog(trail, currentUser.uid, trail.docId, hikeDate);
  };

  // Menu Stuff
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <motion.div initial="hidden" animate="show">
      <motion.div>
        <Card className={classes.root}>
          <CardContent className={classes.contents}>
            <HikeLogModal
              setOpenLogModal={setOpenLogModal}
              openLogModal={openLogModal}
              setHikeDate={setHikeDate}
              handleAddToLog={handleAddToLog}
              title="Edit Hike"
            />
            <TextWrapper>
              <HeaderWrapper>
                <Typography
                  gutterBottom
                  className={classes.header}
                  component="h2"
                >
                  {trail.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h2"
                  // color="rgba(0,0,0,0)"
                >
                  {timeStampToDate(trail.dateHiked)}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h2"
                  color="primary"
                >
                  {trail.length} Miles
                </Typography>
              </HeaderWrapper>

              <LocationWrapper>
                <Typography gutterBottom variant="subtitle2" component="h4">
                  {trail.location}
                </Typography>
                <Button
                  style={{ margin: "auto 0" }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => setOpenLogModal(true)}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      removeTrailFirestoreLog(trail.docId, currentUser.uid)
                      toast.error("Trail remove from you log.")
                      }
                    }
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </LocationWrapper>

              <SubWrapper>
              </SubWrapper>
            </TextWrapper>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
const TextWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const HeaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const LocationWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-end;
  text-align: right;
`;

const SubWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
