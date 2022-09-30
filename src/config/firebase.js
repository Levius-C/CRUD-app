// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ1Yhc8LnO1Y04P108JCSI4bjaQaavdtk",
  authDomain: "project-react-app-831fc.firebaseapp.com",
  projectId: "project-react-app-831fc",
  storageBucket: "project-react-app-831fc.appspot.com",
  messagingSenderId: "474965335436",
  appId: "1:474965335436:web:6853d2d9357def81420aa9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
