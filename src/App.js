
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './index.css';
import './views/home.css'
import React, { useEffect,useState,useContext, createContext } from "react";
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


import Navbar from './Navbar';
import Register from './Register';
import ProductContainer from './ProductContainer';
import Post from './Post';
import BottomNavBar from './BottomNavBar';
import UploadService from './UploadService';
import ParentDemo from './ParentDemo';
import Browse from './Browse';
import LiffLogin from './LiffLogin';
import Landing from "./Landing"
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import AuthService from './AuthService';
import Profile from './Profile';
import ChatUI from './ChatUI';

export const ProductListContext = createContext({})

export default function App() {
  const [productList,setProductList] = useState("")
  AuthService()
  useEffect(() => {
    document.title = "RCUMarketplace"
    
 }, []);


  return(<div>
        <ProductListContext.Provider value={{productList,setProductList}}>
        <div>

          <BottomNavBar/>

        </div>
          <br></br><br></br>
        <div>
          <Routes>
              <Route exact path="/" element={<Landing></Landing>}></Route>
              <Route path="/register" element={<Register/>}/>
              <Route path="/productcontainer" element={<ProductContainer/>}/>
              <Route path="/post" element={<Post/>}></Route>
              <Route path="/demo" element={<UploadService></UploadService>}></Route>
              <Route path="/democomponent" element={<ParentDemo></ParentDemo>}></Route>
              <Route path="/browse" element={<Browse></Browse>}></Route>
              <Route path="/product/:id" element={<Product></Product>}></Route>
              <Route path="/profile" element={<Profile></Profile>}></Route>
              <Route path="/chat" element={<ChatUI></ChatUI>}></Route>
          </Routes>
        </div>

        </ProductListContext.Provider>
    </div>);

}
