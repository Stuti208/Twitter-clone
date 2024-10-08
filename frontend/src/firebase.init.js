// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_-YHHQixV9UZc9UshAuvkeohthRX5Xq8",
  authDomain: "twitter-85047.firebaseapp.com",
  projectId: "twitter-85047",
  storageBucket: "twitter-85047.appspot.com",
  messagingSenderId: "618688077919",
  appId: "1:618688077919:web:7d253eafefa3bd3316fbea",
  measurementId: "G-XV1PF9JN98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export default auth;
export { db };