import { useState, useEffect, useContext } from "react";
import AuthContext from "./ContextProvider";
import liff from "@line/liff";
import FirebaseService from "./FirebaseService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AuthService(){
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);

    ////// FROM LINE /////
    const [displayName,setDisplayName] = useState("");
    const [pictureUrl,setPictureUrl] = useState("");
    const [userID,setUserID] = useState("");
    //////////////////////

    const [FSuserName,setFSuserName] = useState("")

    useEffect(()=>{initLine()},[])

    useEffect(() => {
        const dummyFn = async() => {
      
          const db = FirebaseService()
          const usersCollectionRef = collection(db, "users");
          console.log("LineID while query = ",userID);
          const q = query(usersCollectionRef, where("lineid","==",userID.toString()))
          const qSnapshot = await getDocs(q).then()
          var fireStoreUser = ""
          console.log(qSnapshot)
          qSnapshot.forEach(doc => {
            console.log(doc.data())
            fireStoreUser = doc.data()
          })
          if(fireStoreUser !== ""){
            
            setFSuserName(fireStoreUser.username)
            const uname = fireStoreUser.username
            console.log("username: ",fireStoreUser.username)
            setAuth({userID,FSUsername:uname,pictureUrl})
            navigate("/browse")

          } else {
            console.log("DOC NOT EXISTS")
            navigate("/register")
            
        }
        }
        
      
        if (userID !== "")dummyFn()
      
      
      },[userID])    

    async function initLine (){
        console.log("initLine runs");
        await liff.init(
        { liffId: "1657632240-qZ0KjWll" },
        () => {
            if (liff.isLoggedIn()) {
                console.log("LIFF IS LOGGED IN")
                liff.getProfile()
                .then((profile) => {
                    setDisplayName(profile.displayName);
                    setPictureUrl(profile.pictureUrl);
                    
                    setUserID(profile.userId);
                    console.log(profile.userId)

                 })
                .catch((err) => console.error(err));
            } else {
                console.log("Login Runs!!!");
                liff.login();
            }
        },
        (err) => console.error(err)
        );
    };

    





}