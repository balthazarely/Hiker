import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../config/firebase";

import { pageAnimation } from "../animation/animation";
import { motion } from "framer-motion";
import {
  dataFromSnapshot,
  getTrailsFromFirestore,
  removeFavoriteTrail,
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
  const { currentUser } = useSelector((state) => state.auth);
  const [favoriteTrailsFromFirebase, setFavoriteTrailsFromFirebase] = useState(
    []
  );
  // useEffect(() => {
  //   const unsubscribe = getTrailsFromFirestore(currentUser.uid, {
  //     next: (snapshot) =>
  //       console.log(snapshot.docs.map((docSnap) => dataFromSnapshot(docSnap))),
  //     error: (error) => console.log(error),
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const unsubscribe = getTrailsFromFirestore(currentUser.uid, {
      next: (snapshot) => {
        let trails = snapshot.docs.map((docSnap) => dataFromSnapshot(docSnap));
        console.log(trails);
        setFavoriteTrailsFromFirebase(trails);
      },

      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, []);

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
      <ul>
        {favoriteTrailsFromFirebase &&
          favoriteTrailsFromFirebase.map((trail) => {
            return (
              <div>
                <li>{trail.trailId}</li>;
                <button
                  onClick={() =>
                    removeFavoriteTrail(trail.docId, currentUser.uid)
                  }
                >
                  delete
                </button>
              </div>
            );
          })}
      </ul>
    </motion.div>
  );
}
