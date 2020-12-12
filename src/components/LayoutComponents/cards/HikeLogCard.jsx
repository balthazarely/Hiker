import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Button,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { fetchSingleTrailInfo } from "../../../actions/singleTrailAction";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { popUp } from "../../../animation/animation";
import styled from "styled-components";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  updateFirestoreLog,
  removeTrailFirestoreLog,
} from "../../../firestore/firestoreService";
import EditLogModal from "../modals/EditLogModal";

const useStyles = makeStyles({
  root: {
    margin: "5px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  media: {
    // height: 200,
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

export default function HikeLogCard({
  trail,
  //   removeFavoriteTrail,
  currentUser,
  //   setModalOpen,
}) {
  const classes = useStyles();
  //   const dispatch = useDispatch();
  const [openLogModal, setOpenLogModal] = useState(false);
  const [hikeDate, setHikeDate] = useState("");
  //   const handleOpenModal = () => {
  //     dispatch(fetchSingleTrailInfo(trail.trailId));
  //     setModalOpen(true);
  //   };

  const handleAddToLog = () => {
    setOpenLogModal(false);
    console.log(trail, currentUser.uid, hikeDate);
    updateFirestoreLog(trail, currentUser.uid, trail.docId, hikeDate);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div initial="hidden" animate="show">
      <motion.div
      //  variants={popUp} initial="hidden" animate="show"
      >
        <Card className={classes.root}>
          <CardContent className={classes.contents}>
            <EditLogModal
              setOpenLogModal={setOpenLogModal}
              openLogModal={openLogModal}
              setHikeDate={setHikeDate}
              handleAddToLog={handleAddToLog}
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
                  color="primary"
                >
                  {trail.dateHiked}
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
                    onClick={() =>
                      removeTrailFirestoreLog(trail.docId, currentUser.uid)
                    }
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </LocationWrapper>

              <SubWrapper>
                {/* <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="h2"
                    color="primary"
                  >
                    {trail.dateHiked}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="h2"
                    color="primary"
                  >
                    {trail.length} Miles
                  </Typography> */}
              </SubWrapper>
            </TextWrapper>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
const CardImageWrapper = styled.div`
  /* width: 100px; */
  /* height: 100%; */
  overflow: hidden;
  border-radius: 10px;
  /* margin-left: 5px; */
`;

const CardImage = styled(motion.img)`
  width: 150px;
  height: 100%;
`;

const TextWrapper = styled(motion.div)`
  /* margin-left: 15px; */
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const HeaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 50%;
`;

const LocationWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-end;
`;

const SubWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
