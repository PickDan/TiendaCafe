import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB_S_GOcafDHuuwQlMKw90ScI-Vm4-SWms",
  authDomain: "mobile-d1254.firebaseapp.com",
  projectId: "mobile-d1254",
  storageBucket: "mobile-d1254.appspot.com",
  messagingSenderId: "171726034743",
  appId: "1:171726034743:web:930f9288b3246c48de6cb2",
  measurementId: "G-SHYKJ3E5XS",
  databaseURL: "https://mobile-d1254-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase)
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const database = getDatabase(firebase)