// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwGlqOA9cyde7IttbYihYSdWIq34iluoA",
  authDomain: "personal-finance-tracker-bd8f4.firebaseapp.com",
  projectId: "personal-finance-tracker-bd8f4",
  storageBucket: "personal-finance-tracker-bd8f4.firebasestorage.app",
  messagingSenderId: "934466010115",
  appId: "1:934466010115:web:8cbd38b6c62b486cc22236",
  measurementId: "G-TGQ1EM05Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};
