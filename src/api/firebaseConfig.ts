// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfGnPBJjJZg00P9t26RqiJzu3cY4ZHfdg",
  authDomain: "dnd-tools-e412f.firebaseapp.com",
  projectId: "dnd-tools-e412f",
  storageBucket: "dnd-tools-e412f.appspot.com",
  messagingSenderId: "417806670555",
  appId: "1:417806670555:web:b41c2efa15141962004afe",
  measurementId: "G-8HXH9842BX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
