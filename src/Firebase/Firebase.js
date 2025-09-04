// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUdkXS8VWbVsCMpM1wLgiRl2w2zzL0Hhk",
    authDomain: "studenthub-d5035.firebaseapp.com",
    projectId: "studenthub-d5035",
    storageBucket: "studenthub-d5035.firebasestorage.app",
    messagingSenderId: "917440088786",
    appId: "1:917440088786:web:bafdc7ad36be2c618fbb0b",
    measurementId: "G-HN3DD0Z1GL"
};

const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export default app;