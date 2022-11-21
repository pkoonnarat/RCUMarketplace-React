
import React, { useState, useEffect } from "react";
import {Link, Router } from "react-router-dom";

import liff from "@line/liff";




export default async function LiffLogin() {

    const [pictureUrl, setPictureUrl] = React.useState("");
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userId, setUserId] = useState("");


    const initLine = async () => {
        console.log("initLine runs");
        await liff.init(
        { liffId: "1657632240-qZ0KjWll" },
        () => {
            if (liff.isLoggedIn()) {
                console.log("LIFF IS LOGGED IN")
            setUserData();
            } else {
            console.log("Login Runs!!!");
            liff.login();
            }
        },
        (err) => console.error(err)
        );
    };



    const setUserData = () => {
        //console.log("RUN APP runs!! (LIFF logged in)")
        const idToken = liff.getIDToken();
        setIdToken(idToken);
        liff
        .getProfile()
        .then((profile) => {
            setDisplayName(profile.displayName);
            setPictureUrl(profile.pictureUrl);
            
            setUserId(profile.userId);
            console.log(profile.userId)

        })
        .catch((err) => console.error(err));
    };

    useEffect(() => {
        initLine();
    },[]);




    return({userId,pictureUrl,displayName})
    



}