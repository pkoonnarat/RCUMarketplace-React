
import { BrowserRouter, Link, Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './index.css';
import './views/home.css'
import React, { useEffect,useState } from "react";
//import { ReactDOM } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {collection, Firestore, getDocs, addDoc, doc, updateDoc, getFirestore, initializeFirestore} from "firebase/firestore";
//import LineLogin from './LineLogin';
import liff from '@line/liff';
//import { Router } from 'express';
import logo from './logo.svg';


const firebaseConfig = {
  apiKey: "AIzaSyBtD4fzZm4jRRLL-Kba211etI6jJJl1yko",
  authDomain: "rcumarketplace.firebaseapp.com",
  projectId: "rcumarketplace",
  storageBucket: "rcumarketplace.appspot.com",
  messagingSenderId: "560613943301",
  appId: "1:560613943301:web:eb0d0bda5009f4090e146c",
  measurementId: "G-6X6W93HP1P"
};

function FeatureCardTest(){

  

  return (<div className="home-feature-card">
  <div className="home-container04">
    <img
      src="https://play.teleporthq.io/static/svg/default-img.svg"
      alt="image"
      className="home-image"
    />
    <div className="home-container05">
      <h1 className="home-text">Heading</h1>
      <div className="home-container06">
        <span className="home-text01">Text</span>
      </div>
    </div>
  </div>
</div>);
}




function App() {
  const app = firebase.initializeApp(firebaseConfig)
  const [createFName, setFName] = React.useState("")
  const [createLName, setLName] = React.useState("")
  const [createRoom, setRoom] = React.useState("")

  const [users, setUsers] = React.useState([]);
  const [loader, setLoader] = React.useState(true)
  const db = getFirestore(app)
  const usersCollectionRef = collection(db,'users')


  ////////////LIFF LOGIN/////////
  const [pictureUrl, setPictureUrl] = useState(logo);
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");

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
        console.log("RUN APP runs!! (LIFF logged in)")
        const idToken = liff.getIDToken();
        setIdToken(idToken);
        liff.getProfile().then(profile => {
          console.log(profile);
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl);
          setStatusMessage(profile.statusMessage);
          setUserId(profile.userId);
        }).catch(err => console.error(err));
      }
    
      useEffect(() => {
        initLine();
      }, []);
  
  ////////////CREATE USER//////////////
  const createUser = async () => {
    await addDoc(usersCollectionRef,{fname:createFName,lname:createLName,room:createRoom,register_time:Date.now()})
    window.location.reload();
  }
  ////// if work on specific record we gotta use doc to mention to specific doc and pass that as a param instead

  /////////////API GET UR DATA/////////////
  useEffect(() => {
    initLine();
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    };
    getUsers();
  }, [])
  ////////////RETURN HTML TAGS/////////////
  console.log("Returns actually runs !!");
  return (
    <div className="home-container">
      <BrowserRouter basename='/'>
      <Helmet>
        <title>Sturdy Grave Squirrel</title>
        <meta property="og:title" content="Gay Black Spiderman" />
      </Helmet>
      <div className="home-container01">
        <div className="home-container02">
          <Link to="/" className="home-navlink">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M810.667 725.333h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
              <path d="M810.667 426.667h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
              <path d="M810.667 128h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
            </svg>
          </Link>
        </div>
        <div>
        <input placeholder='Firstname' onChange={(event) => {setFName(event.target.value )}}></input>
        <input placeholder='Lastname' onChange={(event) => {setLName(event.target.value)}}></input>
        <input placeholder='Room' onChange={(event) => (setRoom(event.target.value))}></input>
        <button onClick={createUser}>Create User</button>
        </div>
        <div>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

    <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
    </div>
        {users.map((user) => {return(
        <div className="home-feature-card">
  <div className="home-container04">
    <img
      src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
      alt="image"
      className="home-image"
    />
    <div className="home-container05">
      <h1 className="home-text">{user.fname} {user.lname}</h1>
      <div className="home-container06">
        <span className="home-text01"> Room : {user.room}</span>
      </div>
    </div>
  </div>
</div>);})}

        
        
       
      </div>
      </BrowserRouter>
    </div>
  );
}

//ReactDOM.render(<App/>,document.getElementById('app'))
export default App;
