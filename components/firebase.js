// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIwYWhHrlgS60MIGyw4voiPdJCY2Xfav0",
    authDomain: "grab-parcel.firebaseapp.com",
    projectId: "grab-parcel",
    storageBucket: "grab-parcel.appspot.com",
    messagingSenderId: "16818286704",
    appId: "1:16818286704:web:18cc07bf1db3acaf1504b5",
    measurementId: "G-GP3MN5G22C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);