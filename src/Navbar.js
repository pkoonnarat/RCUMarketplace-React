import "./css/bootstrap-4.4.1.css";
import { Link } from "react-router-dom";
import React,{ useContext } from "react";

import { useEffect } from "react";
import AuthContext from "./ContextProvider";
import { useState } from "react";


const Navbar = () => {
    const [showName,setShowName] = useState("")
    const user = useContext(AuthContext);
    return (

    <nav className="navbar fixed-top navbar-light cu-accent-color rounded-navbar">
        <h1>{user.auth.FSUsername}</h1>
        <Link to="/register">Register</Link>
        <Link to="/productcontainer">ProductContainer (DO NOT RUN)</Link>
        <Link to="/post">Post Box</Link>
        <Link to="/demo">IMG UPload</Link>
        <Link to="/chat">Chat</Link>
    </nav>
    
    );
}
 
export default Navbar;