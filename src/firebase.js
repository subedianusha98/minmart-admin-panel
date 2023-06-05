import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC7j-fDXXUe4td_ZxV8gn8Qrm92w96ejQA",
    authDomain: "react-dashboard-a7d31.firebaseapp.com",
    projectId: "react-dashboard-a7d31",
    storageBucket: "react-dashboard-a7d31.appspot.com",
    messagingSenderId: "431126260604",
    appId: "1:431126260604:web:db4d5fc42ad293da8352f9",
    measurementId: "G-J85M4DV6QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth}