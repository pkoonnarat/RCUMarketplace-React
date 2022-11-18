
import { useState, useEffect } from "react";
import { useNavigate, Link, Router } from "react-router-dom";
import {
  collection,
  Firestore,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getFirestore,
  initializeFirestore,
  where,
  query,
  getDoc
} from "firebase/firestore";
import liff from "@line/liff";
import FirebaseService from "./FirebaseService";



export default function LiffLogin() {
    const navigate = useNavigate()
    const [pictureUrl, setPictureUrl] = useState("");
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    const logout = () => {
        liff.logout();
        window.location.reload();
    };

    const initLine = () => {
        liff.init(
        { liffId: "1657632240-qZ0KjWll" },
        () => {
            if (liff.isLoggedIn()) {
            runApp();
            } else {
            console.log("Login Runs!!!");
            liff.login();
            }
        },
        (err) => console.error(err)
        );
    };

    const runApp = () => {
        //console.log("RUN APP runs!! (LIFF logged in)")
        const idToken = liff.getIDToken();
        setIdToken(idToken);
        liff
        .getProfile()
        .then((profile) => {
            setDisplayName(profile.displayName);
            setPictureUrl(profile.pictureUrl);
            
            setStatusMessage(profile.statusMessage);
            setUserId(profile.userId);

        })
        .catch((err) => console.error(err));
    };

    useEffect(() => {
        initLine();
    }, []);

    const checkUserOnFireStore = async () => {
        
        var foundUser = false;
        const db = FirebaseService()
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("lineid","==",userId))

        const qSnapshot = await getDocs(q)
        qSnapshot.forEach((doc) => {
            
            if(doc.data()){
                foundUser = true
            }
        
        })

        if(foundUser){
            //set Line ID and user data as context
            navigate("/browse")
        }
        else{
            // go to register
            navigate("/register")
        }



    }

    useEffect(() => {
        checkUserOnFireStore()
    },[userId])


}