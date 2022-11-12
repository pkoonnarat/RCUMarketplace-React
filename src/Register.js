import { useState, useEffect } from "react";
import { BrowserRouter, Link, Router } from "react-router-dom";
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
import liff from "@line/liff";
import logo from "./logo.svg";
import "./css/bootstrap-4.4.1.css";

function Register() {
  const [createFName, setFName] = useState("");
  const [createLName, setLName] = useState("");
  const [createRoom, setRoom] = useState("");
  const [createLineID, setLineID] = useState("");
  const [creatUserName, setUserName] = useState("");

  const [pictureUrl, setPictureUrl] = useState(logo);
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
        console.log(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
        setLineID(profile.userId); /// ALWAYS SET CONST INSIDE A FUNCTION
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);

  /////////////// SEND DATA TO FIRESTORE //////////
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
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      fname: createFName,
      lname: createLName,
      room: createRoom,
      register_time: Date.now(),
      lineid: createLineID,
    });
    window.location.reload();
  };

  console.log("how many time it's printed?");


  
  return (

      <div class="p-5">
      <div class="card border-secondary bg-light">
        <br></br>
  <div class="row m-tb-auto">
      <div class="center-block col-lg-5">
	    <p>
			  <center>
                <div><img src={pictureUrl} alt="" width="100" height="102" class="rounded-circle img-fluid"/></div>
		  		<div>{displayName}</div>
        </center></p></div>
        

      <div class="col-lg-7">
        <form>
          <form class="col-lg-12">
            <div class="form-group">
              <label for="exampleInputEmail1">ชื่อจริง</label>
              <input class="form-control" onChange={(event) => {setFName(event.target.value)}} placeholder="Firstname"/>
              <small id="emailHelp1" class="form-text text-muted">เราสัญญาว่าจะไม่เปิดเผยชื่อจริงของคุณ</small> </div>
            <div class="form-group">
              <label for="exampleInputPassword1">นามสกุล</label>
              <input class="form-control" id="exampleInputPassword1" onChange={(event) => {setLName(event.target.value)}} placeholder="Lastname"/>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ยูสเซอร์เนม</label>
              <input class="form-control" onChange={(event) => {setFName(event.target.value)}} placeholder="Enter username" value={displayName}/>
              <small id="emailHelp1" class="form-text text-muted">ชื่อที่แสดงให้ผู้ใช้คนอื่น</small> 
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Room</label>
              <input class="form-control" onChange={(event) => {setFName(event.target.value)}} placeholder="000A"/>
              <small id="emailHelp1" class="form-text text-muted">เลขห้องตามด้วยเตียง เช่น 112A</small> 
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">สัญญาว่าจะไม่โกง</label>
            </div>
            <br></br>
            <button class="btn btn-primary"onClick={() => {createUser()}}>เริ่มใช้งาน</button>
          </form>
          <br></br>
        </form>
      </div>
  </div>
</div>
</div>

  );
}

export default Register;
