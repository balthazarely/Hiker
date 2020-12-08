import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbGOUbS93QNsYvz7cZX_23JkGeLe-Xrsg",
  authDomain: "hiker-70466.firebaseapp.com",
  projectId: "hiker-70466",
  storageBucket: "hiker-70466.appspot.com",
  messagingSenderId: "1060024273209",
  appId: "1:1060024273209:web:c275f8dca9da9b7162c0e8",
  measurementId: "G-773QVXHW9M",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
