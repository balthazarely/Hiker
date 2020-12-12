import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@material-ui/core/";
import ProfileChart from "./ProfileChart";
import {
  dataFromSnapshot,
  getHikeLogFromFirestore,
} from "../firestore/firestoreService";

export default function ProfileInfo({ currentUser }) {
  const [hikeLogFromFirebase, setHikeLogFromFirebase] = useState([]);
  const [userStats, setUserStats] = useState({
    hikesCompleted: 2,
    totalDistance: 0,
  });

  console.log(hikeLogFromFirebase.length);
  useEffect(() => {
    const unsubscribe = getHikeLogFromFirestore(currentUser.uid, {
      next: (snapshot) => {
        let trails = snapshot.docs.map((docSnap) => dataFromSnapshot(docSnap));
        setHikeLogFromFirebase(trails);
        calcStats(trails);
      },
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, []);

  function calcStats(trailData) {
    // let hikeNumber = trailData.length;
    // console.log(hikeNumber);
    // setUserStats({ hikesCompleted: hikeNumber });

    let calcDistance = trailData.reduce(function (acc, obj) {
      return acc + obj.length;
    }, 0);
    setUserStats({ totalDistance: calcDistance });

    //   let distance = 0;
    //   let hikesCompleted = 0;
    //   hikeLogFromFirebase.map((trail) => {
    //     distance = trail.length + distance;
    //   });
    //   setUserStats({ distanceHiked: distance });
  }

  return (
    <div>
      <Avatar>OP</Avatar>
      <Typography variant="h5" component="h4">
        Logged in as {currentUser?.displayName}
      </Typography>
      <Typography variant="subtitle1" component="h4">
        Miles Hiked: {userStats.totalDistance}
      </Typography>
      <Typography variant="subtitle1" component="h4">
        Evevation gained: 12
      </Typography>
      <Typography variant="subtitle1" component="h4">
        total Hiked Completed: {hikeLogFromFirebase.length}
      </Typography>
      {/* <ProfileChart /> */}
    </div>
  );
}
