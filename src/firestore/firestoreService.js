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
