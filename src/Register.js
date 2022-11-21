import { useState, useEffect } from "react";
import { BrowserRouter, Link, Router, useNavigate } from "react-router-dom";
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
import './FirebaseService'
import FirebaseService from "./FirebaseService";

function Register() {
  const navigate = useNavigate()
  const [createFName, setFName] = useState("");
  const [createLName, setLName] = useState("");
  const [createRoom, setRoom] = useState("");
  const [createLineID, setLineID] = useState("");
  const [creatUserName, setUserName] = useState("");
  const [createNisitID, setNisitID] = useState("")

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [addDocDone, setaddDocDone] = useState(false);
  useEffect((() => {
    console.log("Register is done");
    if(addDocDone) navigate('/browse')
  }),[addDocDone])
  useEffect(() => {
    initLine();
  }, []);


  
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
        setLineID(profile.userId); /// ALWAYS SET CONST INSIDE A FUNCTION
      })
      .catch((err) => console.error(err));
  };



  /////////////// SEND DATA TO FIRESTORE //////////
  const db = FirebaseService()
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      fname: createFName,
      lname: createLName,
      room: createRoom,
      register_time: Date.now(),
      lineid: createLineID,
      nisitid: createNisitID,
      username: creatUserName
    });
    setaddDocDone(true)
    console.log("userCreated")
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
              <label for="exampleInputEmail1">ชื่อจริง ๆ</label>
              <div className="row">
              <div className="col"><input class="form-control" onChange={(event) => {setFName(event.target.value)}} placeholder="ชื่อจริง"/></div>
              <div className="col"><input class="form-control" id="exampleInputPassword1" onChange={(event) => {setLName(event.target.value)}} placeholder="นามสกุล"/></div>
              </div>
              <small id="emailHelp1" class="form-text text-muted">เราสัญญาว่าจะไม่เปิดเผยชื่อจริงของคุณ</small> </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ยูสเซอร์เนม</label>
              <input class="form-control" onBlur={(event) => {setUserName(event.target.value)}}/>
              <small id="emailHelp1" class="form-text text-muted">ชื่อที่แสดงให้ผู้ใช้คนอื่น</small> 
            </div>
            <div class="form-group">
            <div className="row">
              <div className="col"><label for="exampleInputEmail1">ห้อง</label></div>
              <div className="col"><label for="exampleInputEmail1">รหัสนิสิต</label></div>
              </div>
              <div className="row">
                <div className="col"><input class="form-control" onChange={(event) => {setRoom(event.target.value)}} placeholder="000A"/></div>
                <div className="col"><input class="form-control" onChange={(event) => {setNisitID(event.target.value)}} placeholder="รหัสนิสิต 10 หลัก"/></div>
              </div>
              <small id="emailHelp1" class="form-text text-muted">ข้อมูลนี้จะไม่ถูกเปิดเผย</small> 
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">สัญญาว่าจะไม่โกง</label>
            </div>
            <br></br>
            <button class="btn btn-primary" type="button" onClick={() => {createUser()}}>เริ่มใช้งาน</button>
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
