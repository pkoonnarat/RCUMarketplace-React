import React,{useState,useEffect} from "react";
import "./css/bootstrap-4.4.1.css"
import UploadService from "./UploadService";
import FirebaseService from "./FirebaseService";
import { addDoc, collection } from "firebase/firestore";
import AuthContext from "./ContextProvider";
import { useContext } from "react";

function Post(){
  const user = useContext(AuthContext);
  const [productName,setProductName] = useState("");
  const [productDesc,setProductDesc] = useState("");
  const [productType,setProductType] = useState("")
  const [productCateg,setProductCateg] = useState("");
  const [productCategOthers, setProductCategOthers] = useState("");
  const [productPrice,setProductPrice] = useState("")
  const [picURL, setPicURL] = useState("");
  useEffect(()=>{
    if(productCateg === "other"){
    document.getElementById("others").disabled = false;}
    else {
      document.getElementById("others").disabled =true;
    }
  });

  async function createPost(){
    console.log(productName)
    console.log(productPrice)
    if(productName === "" || productPrice === ""){
      alert("โปรดใส่ชื่อสินค้าและราคา")
    }
    else{
      const db = FirebaseService();
      const ProductCollectionRef = collection(db,"products")
      await addDoc(ProductCollectionRef, {
          product_name: productName,
          product_desc: productDesc,
          product_price: productPrice,
          ready_status: true,
          created_time: Date.now(),
          pictureUrl: picURL,
          product_type: productType,
          product_categ: productCateg,
          product_categ_others:productCategOthers,
          user_id: user.auth.userID,
          user_url: user.auth.pictureUrl,
          user_name: user.auth.FSUsername
      })
      console.log("uploaded to firestore")
      window.location.reload()
    }
  }

  const getURLFromChild = (theURL) => {
    setPicURL(theURL)
  }


  return ( <body>
    <div class="container rcorners2 bg-light">
      <label ><h4>ชื่อสินค้า</h4></label><br/>
      <input type="text" cols="35" class="rcorners2" onBlur={(event) => {setProductName(event.target.value)}}/><br/><br/>
      <label ><h4>รายละเอียด</h4></label><br/>
      <textarea  cols="35" rows="2" class="rcorners2" onBlur={(event) => {setProductDesc(event.target.value);}} >
    </textarea>
    <label><h4>ราคา</h4></label>
    <input cols="35" rows="2" className="rcorners2" onBlur={(event) => {setProductPrice(event.target.value)}} placeholder="ใส่เป็นข้อความได้ เช่น '45 บาท พิเศษ +10 บาท / เพิ่มไข่ + 10 บาท'"></input>
        <div onChange={(event) => {
           setProductCateg(event.target.value)}}>
      <h5>Tags</h5>
        <label><input type="radio" name="categ" value="อาหาร"></input> อาหาร </label>
        <label><input type="radio" name="categ" value="ของใช้"></input> ของใช้ </label>
        <label><input type="radio" name="categ" value="other" onBlur={(event) => {setProductCategOthers(event.target.value)}}></input> อื่น ๆ </label>
        </div>
        <input id="others" disabled></input>
    <div onChange={(event) => {setProductType(event.target.value)}}>
        <h5>Type</h5>
        <label><input type="radio" name="type" value="1"/> ส่งต่อ </label>
        <label><input type="radio" name="type" value="2"/> ตามหา </label>
        
    </div>
      <label><h5>เพิ่มรูปภาพ</h5></label>
      <br/>
      <UploadService childToParent={getURLFromChild}/>
      <button onClick={() =>{console.log("received url : ",picURL)}} >check here</button>
         <br/><br/>
      <button type="button" class="btn btn-primary-dark" align="center" onClick={() => {createPost()}}>สร้างประกาศ</button>
      
    </div>
    
      </body> );







}
//<button onClick={() => {console.log(productType)}}>test</button> TEST BUTTON FOR RADIOBUTTON
//<button type="button" onClick={() => {console.log(picURL)}}>Check URL</button>
export default Post;