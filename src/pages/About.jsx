import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { motion } from "framer-motion";
import { pageAnimation } from "../animation/animation";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function About() {
  const classes = useStyles();

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
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to Hiker!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
           This app was created to allow users to find and save hiking trail nearby. Once logged in, users can also log their hikes and access their own hiking data. This practice app was created using React, Redux, Firebase (Firestore, Authentication, and Hoasting), the Hiking Project API, Material UI, and React-Map-GL. 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                      <a style={{textDecoration: "none", color: "white"}} target="BLANK" href="https://github.com/balthazarely/Hiker">Github Link</a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                  <a target="BLANK" href="https://www.balthazar-ely.com/" style={{textDecoration: "none" , color: "#07AEE9"}}>My Portfolio</a>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      </motion.div>
  );
}