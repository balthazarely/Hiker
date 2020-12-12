import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Icon,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

import CloseIcon from "@material-ui/icons/Close";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import { useDispatch } from "react-redux";
import { fetchSingleTrailInfo } from "../../../actions/singleTrailAction";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { popUp } from "../../../animation/animation";
import styled from "styled-components";
import { addTrailToFirestoreLog } from "../../../firestore/firestoreService";
import HikeLogModal from "../modals/HikeLogModal";

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

export default function ProfileTrailCard({
  trail,
  removeFavoriteTrail,
  currentUser,
  setModalOpen,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openLogModal, setOpenLogModal] = useState(false);
  const [hikeDate, setHikeDate] = useState("");
  const handleOpenModal = () => {
    dispatch(fetchSingleTrailInfo(trail.trailId));
    setModalOpen(true);
  };

  const handleAddToLog = () => {
    if (hikeDate === "") {
      console.log("Error. Pls enter date");
    } else {
      setOpenLogModal(false);
      console.log(trail, currentUser.uid, hikeDate);
      addTrailToFirestoreLog(trail, currentUser.uid, hikeDate);
    }
  };

  return (
    // <Grid item xs={6} sm={4} md={4} lg={3}>
    <motion.div initial="hidden" animate="show">
      <motion.div
      // variants={popUp} initial="hidden" animate="show"
      >
        <Card className={classes.root}>
          <CardContent className={classes.contents}>
            <HikeLogModal
              setOpenLogModal={setOpenLogModal}
              openLogModal={openLogModal}
              setHikeDate={setHikeDate}
              handleAddToLog={handleAddToLog}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <CardImageWrapper onClick={handleOpenModal}>
                <CardImage src={trail.img} title="Contemplative Reptile" />
              </CardImageWrapper>
              <TextWrapper>
                <HeaderWrapper>
                  <Typography
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenModal}
                    gutterBottom
                    className={classes.header}
                    component="h2"
                  >
                    {trail.name}
                  </Typography>
                  <Hidden xsDown>
                    <Rating
                      name="simple-controlled"
                      value={trail.stars}
                      size="small"
                    />
                  </Hidden>
                </HeaderWrapper>
                <Typography gutterBottom variant="subtitle" component="h4">
                  {trail.location}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h2"
                  color="primary"
                >
                  {trail.length} Miles
                </Typography>

                <Typography gutterBottom className={classes.subheader}>
                  {trail.summary}
                </Typography>
                <ButtonWrapper>
                  <Button
                    onClick={() =>
                      removeFavoriteTrail(trail.docId, currentUser.uid)
                    }
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    endIcon={<CloseIcon />}
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => setOpenLogModal(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    endIcon={<DirectionsWalkIcon />}
                  >
                    Log
                  </Button>
                </ButtonWrapper>
              </TextWrapper>
              {/* <MiniMap
                  trailInfo={trail}
                  style={{ postion: "absolute", right: 0 }}
                /> */}
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </motion.div>
    </motion.div>
    // </Grid>
  );
}
const CardImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  background: red;
  cursor: pointer;
  /* margin-left: 5px; */
`;

const CardImage = styled(motion.img)`
  min-width: 100%;
  min-height: 100%;
`;

const TextWrapper = styled(motion.div)`
  margin-left: 15px;
  width: 80%;
`;
const HeaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;
