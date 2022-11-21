

import './index.css';
import './views/home.css'
import React, { useEffect,useState,} from "react";
//import { ReactDOM } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import FirebaseService from "./FirebaseService";
import { useNavigate } from 'react-router-dom';
import LiffLogin from './LiffLogin';


export default function InitApp(){

    const [idLine, setidLine] = useState("")
    const [FSuserName, setFSuserName] = useState("")
    const navigate = useNavigate()
    var LineID = ""
    var LinePicURL = ""
    var LineUsername = ""
    var FSuname = ""
    var markDone = false;

    useEffect(() => {
        document.title = "RCUMarketplace"
     }, []);
    
      const InitLineService = async () => {
        
          const snapshot = await LiffLogin()
          console.log(snapshot)
          LineID = snapshot.userId.toString()
          setidLine(snapshot.userId)
          LinePicURL = snapshot.pictureUrl
          LineUsername = snapshot.displayName
          if (LineID !== "") markDone = true
    }
    
    useEffect(() => {
      const dummyFn = async() => {
    
        const db = FirebaseService()
        const usersCollectionRef = collection(db, "users");
        console.log("LineID while query = ",LineID);
        const q = query(usersCollectionRef, where("lineid","==",LineID))
        const qSnapshot = await getDocs(q).then()
        var fireStoreUser = ""
        console.log(qSnapshot)
        qSnapshot.forEach(doc => {
          console.log(doc.data())
          fireStoreUser = doc.data()
        })
        if(fireStoreUser !== ""){
          
          setFSuserName(fireStoreUser.username)
          console.log("username: ",fireStoreUser.username)
          navigate("/browse")
        } else {
          console.log("DOC NOT EXISTS")
          navigate("/register")
          
      }
      }
    
      if (LineID !== "")dummyFn()
    
    
    },[idLine])
    
    if(!markDone)InitLineService()

    return({LineID,LinePicURL,FSuserName})
}