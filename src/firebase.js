import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAvPmwSFX6CfRTKh06wUeDHUti_T2WzlPE",
    authDomain: "day-to-day-business-2362e.firebaseapp.com",
    databaseURL: "https://day-to-day-business-2362e.firebaseio.com",
    projectId: "day-to-day-business-2362e",
    storageBucket: "day-to-day-business-2362e.appspot.com",
    messagingSenderId: "419113329242",
    appId: "1:419113329242:web:966df1b85aede5c25eee63",
    measurementId: "G-40JL80QWPV"
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth()
  export const firestore = firebase.firestore()

  export default firebase