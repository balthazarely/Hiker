import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { pageAnimation } from "../animation/animation";
import { motion } from "framer-motion";
import {
  dataFromSnapshot,
  getTrailsFromFirestore,
} from "../firestore/firestoreService";
import {
  Container,
  CircularProgress,
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core/";
export default function Profile() {
  // I do not remember how this works
  useEffect(() => {
    const unsubscribe = getTrailsFromFirestore({
      next: (snapshot) =>
        console.log(
          snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
        ),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  });

  const { currentUser } = useSelector((state) => state.auth);

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
      <Typography variant="h3" component="h4">
        Logged in as {currentUser?.displayName}
      </Typography>
    </motion.div>
  );
}
