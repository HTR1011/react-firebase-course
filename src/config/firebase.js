// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8DxkNGfh_Rwqz_Zgzm9fBAFbxvKMF8Yg",
  authDomain: "fir-course-6208d.firebaseapp.com",
  projectId: "fir-course-6208d",
  storageBucket: "fir-course-6208d.appspot.com",
  messagingSenderId: "45051789310",
  appId: "1:45051789310:web:4b7f20f9fe37ba01274aaf",
  measurementId: "G-RW26WKDZ7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// email&pw sign in
export const auth = getAuth(app)
// sign in with google
export const googleProvider = new GoogleAuthProvider();
// access firestore
export const db = getFirestore(app);
