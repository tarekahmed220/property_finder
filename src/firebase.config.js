// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // for storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiUzxv1w_zPTL8fDLyL6bfSnqW7ZAfrC4",
  authDomain: "property-finder-a02c9.firebaseapp.com",
  projectId: "property-finder-a02c9",
  storageBucket: "property-finder-a02c9.appspot.com",
  messagingSenderId: "215114203740",
  appId: "1:215114203740:web:53f928857cfbc4a03e5c99",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
