import firebase from "../config/firebase";

const db = firebase.firestore();

export function setUserProfileData(user) {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function favoriteTrail(trail, userID) {
  return db.collection("users").doc(userID).collection("favoriteTrails").add({
    name: trail.name,
    trailId: trail.id,
    summary: trail.summary,
    difficulty: trail.difficulty,
    img: trail.imgSmall,
    length: trail.length,
    latitude: trail.latitude,
    longitude: trail.longitude,
    stars: trail.stars,
    location: trail.location,
  });
}
export function addTrailToFirestoreLog(trail, userID, date) {
  return db.collection("users").doc(userID).collection("hikeLog").add({
    dateHiked: date,
    name: trail.name,
    trailId: trail.trailId,
    summary: trail.summary,
    difficulty: trail.difficulty,
    img: trail.img,
    length: trail.length,
    latitude: trail.latitude,
    longitude: trail.longitude,
    stars: trail.stars,
    location: trail.location,
  });
}

export function updateFirestoreLog(trail, userID, docID, date) {
  return db
    .collection("users")
    .doc(userID)
    .collection("hikeLog")
    .doc(docID)
    .update({
      dateHiked: date,
    });
}
export function removeTrailFirestoreLog(docID, userId) {
  return db
    .collection("users")
    .doc(userId)
    .collection("hikeLog")
    .doc(docID)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
export function removeFavoriteTrail(docId, userID) {
  return db
    .collection("users")
    .doc(userID)
    .collection("favoriteTrails")
    .doc(docId)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

export function removeFavoriteTrailQuery(trailId, userID) {
  return db
    .collection("users")
    .doc(userID)
    .collection("favoriteTrails")
    .where("trailId", "==", trailId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}

// export function removeFavoriteTrail(trailId, userID) {
//   let query = db
//     .collection("users")
//     .doc(userID)
//     .collection("favoriteTrails")
//     .where("trailId", "==", trailId);
//   query.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       doc.ref.delete();
//     });
//   });
// }

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();
  return {
    ...data,
    docId: snapshot.id,
  };
}

export function getTrailsFromFirestore(userID, observer) {
  return db
    .collection("users")
    .doc(userID)
    .collection("favoriteTrails")
    .onSnapshot(observer);
}

export function getHikeLogFromFirestore(userID, observer) {
  return db
    .collection("users")
    .doc(userID)
    .collection("hikeLog")
    .onSnapshot(observer);
}
