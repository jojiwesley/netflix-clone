import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";

import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";

import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnsLO31xKa4B27I2j_wLyWJaXK2xNhizE",
  authDomain: "netflix-clone-d96d1.firebaseapp.com",
  projectId: "netflix-clone-d96d1",
  storageBucket: "netflix-clone-d96d1.appspot.com",
  messagingSenderId: "654922737131",
  appId: "1:654922737131:web:aa627f8e06d85a06e0e5ae",
  measurementId: "G-LVYRXC9Q5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
try {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db,"user"),{
    uid: user.uid,
    name,
    authProvifer: "local",
    email,
  });
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "),{position: "bottom-left"});
}
}

const login = async (email, password) => {
try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "),{position: "bottom-left"});
}
} 

const logout = async (email, password) => {
  signOut(auth);
  }
  
  export {auth, db, signup, login, logout };