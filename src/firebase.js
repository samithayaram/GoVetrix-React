// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsXvftr0ahZCoKeEfUR8ZdD6jxu8vr5WQ",
  authDomain: "govetrix-project.firebaseapp.com",
  projectId: "govetrix-project",
  storageBucket: "govetrix-project.firebasestorage.app",
  messagingSenderId: "666320752554",
  appId: "1:666320752554:web:07b7abeba97e73929e25d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const googleProvider = new GoogleAuthProvider();
export default firebaseConfig 
