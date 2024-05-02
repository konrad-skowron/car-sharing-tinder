// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref} from  'firebase/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyA7IzumAspO5OaWA_l0lQXKJOwa0Q4L_to",
authDomain: "car-sharing-tinder-4f633.firebaseapp.com",
projectId: "car-sharing-tinder-4f633",
storageBucket: "car-sharing-tinder-4f633.appspot.com",
messagingSenderId: "404310386523",
appId: "1:404310386523:web:0270fcd52c276690be1c7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;