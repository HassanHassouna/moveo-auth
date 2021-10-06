import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDRXbSqScSCHMMMwIqB4qP1kKGtfRYqNB0",
  authDomain: "moveo-auth.firebaseapp.com",
  projectId: "moveo-auth",
  storageBucket: "moveo-auth.appspot.com",
  messagingSenderId: "743339999126",
  appId: "1:743339999126:web:c9e7d104ee179ad178e7b7",
  measurementId: "G-J7N410YRHE",
}
// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
export { auth, db }
