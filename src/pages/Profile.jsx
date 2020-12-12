import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { pageAnimation } from "../animation/animation";
import { motion } from "framer-motion";
import Pagination from "@material-ui/lab/Pagination";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import styled from "styled-components";

import {
  dataFromSnapshot,
  getHikeLogFromFirestore,
  getTrailsFromFirestore,
  removeFavoriteTrail,
} from "../firestore/firestoreService";
import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core/";

import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import SingleTrailModal from "../components/SingleTrailModal";

import ProfileTrailCard from "../components/LayoutComponents/cards/ProfileTrailCard";
import HikeLogCard from "../components/LayoutComponents/cards/HikeLogCard";
import ProfileInfo from "../components/ProfileInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: theme.spacing(1.2),
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
}));

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const [favoriteTrailsFromFirebase, setFavoriteTrailsFromFirebase] = useState(
    []
  );
  const [hikeLogFromFirebase, setHikeLogFromFirebase] = useState([]);

  useEffect(() => {
    const unsubscribe = getTrailsFromFirestore(currentUser.uid, {
      next: (snapshot) => {
        let trails = snapshot.docs.map((docSnap) => dataFromSnapshot(docSnap));
        setFavoriteTrailsFromFirebase(trails);
      },
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = getHikeLogFromFirestore(currentUser.uid, {
      next: (snapshot) => {
        let trails = snapshot.docs.map((docSnap) => dataFromSnapshot(docSnap));
        setHikeLogFromFirebase(trails);
      },
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, []);

  ////TABS
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`a11y-tabpanel-${index}`}
        aria-labelledby={`a11y-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 500,
    },
  });
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // pagination shit
  const classes = useStyles();

  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(
    favoriteTrailsFromFirebase.length / itemsPerPage
  );
  console.log(numberOfPages);
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPage] = useState(numberOfPages);

  const handleChangePagingation = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item md={4} xs={12} sm={12}>
          <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {modalOpen ? (
              <SingleTrailModal setModalOpen={setModalOpen} />
            ) : null}
            <Container>
              <motion.div
                variants={pageAnimation}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <ProfileInfo currentUser={currentUser} />
              </motion.div>
            </Container>
          </motion.div>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Container>
            <Paper square>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon label tabs example"
              >
                <Tab icon={<PhoneIcon color="primary" />} label="FAVORITES" />
                <Tab icon={<FavoriteIcon color="primary" />} label="LOG" />
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              {/* HERE IS WHERE THE LIST IS */}

              {favoriteTrailsFromFirebase &&
                favoriteTrailsFromFirebase
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)

                  .map((trail) => {
                    return (
                      <ProfileTrailCard
                        key={trail.trailId}
                        trail={trail}
                        currentUser={currentUser}
                        removeFavoriteTrail={removeFavoriteTrail}
                        setModalOpen={setModalOpen}
                      />
                    );
                  })}
              <PaginationWrapper>
                <Pagination
                  count={numberOfPages}
                  page={page}
                  onChange={handleChangePagingation}
                  defaultPage={1}
                  color="primary"
                  size="medium"
                  classes={{ ul: classes.paginator }}
                />
              </PaginationWrapper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {hikeLogFromFirebase &&
                hikeLogFromFirebase.map((hike) => {
                  return <HikeLogCard trail={hike} currentUser={currentUser} />;
                })}
            </TabPanel>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
