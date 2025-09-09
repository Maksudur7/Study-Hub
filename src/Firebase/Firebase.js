
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJixgL2uQxCweszFu5gy7ZA_0IwSSHqcE",
    authDomain: "studyhub-f26cc.firebaseapp.com",
    projectId: "studyhub-f26cc",
    storageBucket: "studyhub-f26cc.firebasestorage.app",
    messagingSenderId: "789741973889",
    appId: "1:789741973889:web:31f917e56256ef641db880",
    measurementId: "G-4EM4DGSPLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;