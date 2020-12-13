import React, { useEffect, useState } from "react";
import { Avatar, Typography, CircularProgress } from "@material-ui/core/";
import {
  dataFromSnapshot,
  getHikeLogFromFirestore,
} from "../firestore/firestoreService";
import styled from "styled-components";

export default function ProfileInfo({ currentUser, authenticated }) {
  const [hikeLogFromFirebase, setHikeLogFromFirebase] = useState([]);
  const [userStats, setUserStats] = useState({
    hikesCompleted: 2,
    totalDistance: 0,
  });
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (authenticated) {
      const unsubscribe = getHikeLogFromFirestore(currentUser.uid, {
        next: (snapshot) => {
          let trails = snapshot.docs.map((docSnap) =>
            dataFromSnapshot(docSnap)
          );
          setHikeLogFromFirebase(trails);
          calcStats(trails);
          setLoading(false)
        },
        error: (error) => console.log(error),
      });
      return unsubscribe;
    }
  }, []);

  function roundDown(num) {
    return num.toFixed(2);
  }

  function calcStats(trailData) {
    let calcDistance = trailData.reduce(function (acc, obj) {
      return acc + obj.length;
    }, 0);
    setUserStats({ totalDistance: calcDistance });
  }

  return (
    <ProfileWrapper>
      <Avatar
        alt="Remy Sharp"
        src="placeholder-person.jpg"
        style={{ width: "50px", height: "50px", marginBottom: "20px" }}
      />

      <Typography variant="h5" component="h4">
        {currentUser?.displayName}
      </Typography>
      <Stats>
      {loading ?
        (<LoadingContainer>
          <CircularProgress />
        </LoadingContainer>)
        : (
          <div>
             <Typography variant="subtitle2" component="h4">
          Distance Hiked:
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          color="primary"
          style={{ fontSize: "26px" }}
        >
          {roundDown(userStats.totalDistance)}
          <span style={{ fontSize: "16px" }}> miles</span>
        </Typography>

        <Typography variant="subtitle2" component="h4">
          Hiked Completed:
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          color="primary"
          style={{ fontSize: "26px" }}
        >
          {hikeLogFromFirebase.length}
        </Typography>
          </div>
        )}
      </Stats>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Stats = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #eeeeee;
`;
const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

