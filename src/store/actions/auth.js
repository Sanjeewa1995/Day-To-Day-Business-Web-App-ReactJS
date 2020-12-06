import * as actionTypes from "./actionsTypes";
import { firebaseAuth } from "../../firebase";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCES,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAILD,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    if (isSignUp) {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user.user);
          dispatch(authSuccess(user.user.id, user.user.uid));
          checkAuthTimeout(3600);
        })
        .catch((error) => {
          dispatch(authFail(error.message));
        });
    } else {
        firebaseAuth.signInWithEmailAndPassword(email,password).then((user)=>{
            console.log(user.user);
            dispatch(authSuccess(user.user.id, user.user.uid));
            checkAuthTimeout(3600);
        }).catch((error)=>{
            dispatch(authFail(error.message));
        })
    }
  };
};
