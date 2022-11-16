
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
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
import Navbar from './Navbar';
import Register from './Register';
import ProductContainer from './ProductContainer';
import Landing from './Landing';
import Post from './Post';
import BottomNavBar from './BottomNavBar';
import UploadService from './UploadService';



//<BottomNavBar/> เอาออกก่อน
const App = () => {
  return(<div>
    <ErrorBoundary><div>
      <Navbar/>
      
      </div>
      <br></br>
      <br></br>
      <div>
      <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/productcontainer" element={<ProductContainer/>}/>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/demo" element={<UploadService></UploadService>}></Route>
    </Routes>
    </div>
    </ErrorBoundary></div>);

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default App;
