import {useState,useEffect} from "react";
import { BrowserRouter, Link, Router } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import {collection, Firestore, getDocs, addDoc, doc, updateDoc, getFirestore, initializeFirestore} from "firebase/firestore";
import liff from '@line/liff';
import logo from "./logo.svg"



function Register(){
    console.log("Register function runs")
    ////////////// INIT VAR ////////////
    const [createFName, setFName] = useState("")
    const [createLName, setLName] = useState("")
    const [createRoom, setRoom] = useState("")
    const [createLineID,setLineID] = useState("")


    const [pictureUrl, setPictureUrl] = useState(logo);
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    
    //////////////// LIFF LOGIN //////////////
    const logout = () => {
        liff.logout();
        window.location.reload();
    }

    const initLine = () => {
        liff.init({ liffId: '1657632240-qZ0KjWll' }, () => {
        if (liff.isLoggedIn()) {
            runApp();
        } else {
            console.log("Login Runs!!!");
            liff.login();
        }
        }, err => console.error(err));
    }

    const runApp = () => {
        //console.log("RUN APP runs!! (LIFF logged in)")
        const idToken = liff.getIDToken();
        setIdToken(idToken);
        liff.getProfile().then(profile => {
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl);
          console.log(profile.pictureUrl);
          setStatusMessage(profile.statusMessage);
          setUserId(profile.userId);
        }).catch(err => console.error(err));
      }
    
      useEffect(() => {
        initLine();
      }, []);


    setLineID(userId);

    /////////////// SEND DATA TO FIRESTORE //////////
    const firebaseConfig = {
        apiKey: "AIzaSyBtD4fzZm4jRRLL-Kba211etI6jJJl1yko",
        authDomain: "rcumarketplace.firebaseapp.com",
        projectId: "rcumarketplace",
        storageBucket: "rcumarketplace.appspot.com",
        messagingSenderId: "560613943301",
        appId: "1:560613943301:web:eb0d0bda5009f4090e146c",
        measurementId: "G-6X6W93HP1P"
      };
          
    const app = firebase.initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const usersCollectionRef = collection(db,'users')

    const createUser = async() => {
        await addDoc(usersCollectionRef,{fname:createFName,lname:createLName,room:createRoom,register_time:Date.now(),lineid:createLineID})
        window.location.reload();
    }
    


    return(
        
        <BrowserRouter basename='/register'><body>
            {console.log("Return Runs")}
            <div>
            <img src={pictureUrl} width="300px" height="300px" align="center"></img>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

            </div>
            <div></div><div></div>
            <div>
            <input placeholder='Firstname' onChange={(event) => {setFName(event.target.value )}}></input>
        <input placeholder='Lastname' onChange={(event) => {setLName(event.target.value)}}></input>
        <input placeholder='Room' onChange={(event) => (setRoom(event.target.value))}></input>
        <button onClick={() => createUser()}>Create User</button>

            </div>


    </body>
    </BrowserRouter>);
}


export default Register;