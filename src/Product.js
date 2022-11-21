import { addDoc, collection, deleteDoc, doc,getDoc,getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FirebaseService from "./FirebaseService"
import { useState } from "react";
import "./css/bootstrap-4.4.1.css"
import AuthContext from "./ContextProvider";
import { useContext } from "react";

export default function Product () {
    const [ordered,setOrdered] = useState(false)
    const {auth} = useContext(AuthContext)
    const [prodID,setProdID] = useState("")
    const [orderID,setOrderID] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const firebaseConfig = {
        apiKey: "AIzaSyBtD4fzZm4jRRLL-Kba211etI6jJJl1yko",
        authDomain: "rcumarketplace.firebaseapp.com",
        projectId: "rcumarketplace",
        storageBucket: "rcumarketplace.appspot.com",
        messagingSenderId: "560613943301",
        appId: "1:560613943301:web:eb0d0bda5009f4090e146c",
        measurementId: "G-6X6W93HP1P",
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const OrderCollectionRef = collection(db,"order")
    var [productData,setProductData] = useState({})
    console.log("product page runs")

    const getProductDetails = async () => {
    
        const docRef = doc(db,"products",id)
        const docSnap = await getDoc(docRef)

        setProdID(docSnap.id)
        console.log(docSnap.data())
        setProductData(docSnap.data())

    }
    useEffect(() => {getProductDetails()},[])

    async function createOrder(){
        
      await addDoc(OrderCollectionRef, {
          product_id: prodID,
          product_name: productData.product_name,
          target_pic: productData.user_url,
          target_name: productData.user_name,
          target_id: productData.user_id,
          product_pic: productData.pictureUrl,
          created_time: Date.now(),
          creator_id: auth.userID,
          creator_name: auth.FSUsername,
          creator_pic: auth.pictureUrl
      }).then(docRef => {setOrderID(docRef.id)})
      console.log("uploaded to firestore")
      setOrdered(true)

    }

    async function deleteOrder(){
        const docRef = doc(db,"order",orderID.toString())
        await deleteDoc(docRef).then(() => {
            setOrdered(false)
        })
    
    }




    return(
        <body>
            <br/><br/><br/>
        <div class="container-fluid">
	        <div class="container">
             <div class="row text-center">
                <div class="col-md-4 pb-1 pb-md-0">
                    <div class="card"> 
                    {productData.pictureUrl ? <img className="card-img-top" src={productData.pictureUrl} /> : <br/> }</div><br/>
                    <button type="button" className="button-p3">{productData.product_type === "1"? "ส่งต่อ" : "ตามหา"}</button>
                <button type="button" className="button-p2">{productData.product_categ === "other"? productData.product_categ_others : productData.product_categ}</button>
                       
                    </div>
        <div class="col-md-4 pb-1 pb-md-0 w-100 col-xl-8 col-lg-8">
          <div class="card">
			  <div class="card-body" >
              <h5 class="card-title">{productData.product_name}</h5>
				  <hr class="hr"></hr>
<p class="card-text">{productData.product_desc}</p>
				  
<p class="card-text" align="left">{productData.product_price}</p>
</div> 
          </div>
		  <div class="row">
		    <div class="container-fluid col-md-6">
			  <img src={productData.user_url} class="rounded-circle" alt="Cinque Terre" width="100" height="100"/><h5 class="card-title">{productData.user_name}</h5></div>
			<div class="container-fluid col-md-6 wrap-container">
				<div class="container">		    
					<button type="button" class="button-cap" onClick={() => {navigate("/chat")}}>พูดคุย</button>
                    {ordered === false? <button type="button" class="button-cap" onClick={() => {createOrder()}}>สร้างคำสั่งซื้อ</button>: <button type="button" class="button-cap" onClick={() => {deleteOrder()}}>เสร็จสิ้น</button>}
                    
				</div>
                <br/><br/><br/>
			  		  </div>
        </div>
</div>
</div>
  </div>
  </div>
  </body>
    )


}