import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { pageAnimation } from "../animation/animation";
import { motion } from "framer-motion";
import Pagination from "@material-ui/lab/Pagination";
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
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  CircularProgress
} from "@material-ui/core/";

import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SingleTrailModal from "../components/SingleTrailModal";
import ProfileTrailCard from "../components/LayoutComponents/cards/ProfileTrailCard";
import HikeLogCard from "../components/LayoutComponents/cards/HikeLogCard";
import ProfileInfo from "../components/ProfileInfo";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useSelector((state) => state?.auth);
  const { currentUser } = useSelector((state) => state?.auth);
  const [favoriteTrailsFromFirebase, setFavoriteTrailsFromFirebase] = useState(
    []
  );
  const [hikeLogFromFirebase, setHikeLogFromFirebase] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (authenticated) {
      const unsubscribe = getTrailsFromFirestore(currentUser.uid, {
        next: (snapshot) => {
          let trails = snapshot.docs.map((docSnap) =>
            dataFromSnapshot(docSnap)
          );
          setFavoriteTrailsFromFirebase(trails);
          setLoading(false)
        },
        error: (error) => console.log(error),
      });
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      const unsubscribe = getHikeLogFromFirestore(currentUser.uid, {
        next: (snapshot) => {
          let trails = snapshot.docs.map((docSnap) =>
            dataFromSnapshot(docSnap)
          );
          setHikeLogFromFirebase(trails);
        },
        error: (error) => console.log(error),
      });
      return unsubscribe;
    }
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

  // Pagination Favorites
  const classes = useStyles();
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(
    favoriteTrailsFromFirebase.length / itemsPerPage
  );
  const [page, setPage] = React.useState(1);
  const handleChangePagingation = (event, value) => {
    setPage(value);
  };

  // Pagination Log
  const itemsPerPageLog = 8;
  const numberOfPagesLog = Math.ceil(
    hikeLogFromFirebase.length / itemsPerPageLog
  );
  const [pageLog, setPagLoge] = React.useState(1);
  const handleChangePagingationLog = (event, value) => {
    setPagLoge(value);
  };

  // let filteredHikeLog = hikeLogFromFirebase.filter(trail => trail.length === 10.4)
  let filteredHikeLog = hikeLogFromFirebase.sort(sortTrailLog)

  function sortTrailLog(a, b) {
    const trailA = a.dateHiked
    const trailB = b.dateHiked
    let comparison = 0;
    if (trailA < trailB) {
      comparison = 1;
    } else if (trailA > trailB) {
      comparison = -1;
    }
    return comparison;
  }
  

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
                <ProfileInfo
                  currentUser={currentUser}
                  authenticated={authenticated}
                />
              </motion.div>
            </Container>
          </motion.div>
        </Grid>

        <Grid item md={8} sm={12} xs={12}>
          <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {authenticated ? (
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
                    <Tab
                      icon={<PhoneIcon color="primary" />}
                      label="FAVORITES"
                    />
                    <Tab icon={<FavoriteIcon color="primary" />} label="LOG" />
                  </Tabs>
                </Paper>

                <TabPanel value={value} index={0}>
                  
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

                  {loading &&
                  <LoadingContainer>
                    <CircularProgress />
                  </LoadingContainer>
                  }
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PaginationWrapper>
                    <Pagination
                      count={numberOfPagesLog}
                      page={pageLog}
                      onChange={handleChangePagingationLog}
                      defaultPage={1}
                      color="primary"
                      size="medium"
                      classes={{ ul: classes.paginator }}
                    />
                  </PaginationWrapper>
                  {filteredHikeLog &&
                    filteredHikeLog
                      .slice(
                        (pageLog - 1) * itemsPerPageLog,
                        pageLog * itemsPerPageLog
                      )
                      .map((hike) => {
                        return (
                          <HikeLogCard trail={hike} currentUser={currentUser} key={hike.trailId} />
                        );
                      })}
                </TabPanel>
              </Container>
            ) : (
              <Container
                style={{
                  height: "40vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="rgb(100,100,100)"
                >
                  Please login or register to access account data
                </Typography>
              </Container>
            )}
          </motion.div>
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

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

