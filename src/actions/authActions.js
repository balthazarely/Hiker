import { SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConstants";
import { APP_LOADED } from "../reducers/asyncReducer";
import firebase from "../config/firebase";

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function varifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser(payload) {
  return {
    type: SIGN_OUT_USER,
    payload,
  };
}
