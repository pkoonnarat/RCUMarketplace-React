import firebase from "firebase/compat/app";
import {
  collection,
  Firestore,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";


export default function FirebaseService(){

    const firebaseConfig = {
        apiKey: "AIzaSyBtD4fzZm4jRRLL-Kba211etI6jJJl1yko",
        authDomain: "rcumarketplace.firebaseapp.com",
        projectId: "rcumarketplace",
        storageBucket: "rcumarketplace.appspot.com",
        messagingSenderId: "560613943301",
        appId: "1:560613943301:web:eb0d0bda5009f4090e146c",
        measurementId: "G-6X6W93HP1P",
    };

    const app = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db;
    //use this to call collection ref : const usersCollectionRef = collection(db, "users");
    // then addDoc 


}