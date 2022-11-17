import FirebaseService from "./FirebaseService";
import { getDoc, collection, doc } from "firebase/firestore";
import "./css/bootstrap-4.4.1.css"
import defaultimg from "./img/image-4.jpeg"
import { useState } from "react";


export default function ProductContainer(props){
    const [ProductDetail, setProductDetail] = useState("");
    
    const getUserDetails = async () => {
        const documentID = "POkarJz7hBM0hqF7c6Qy"
        const db = FirebaseService();
        const productDocRef = doc(db,"products",documentID)
        const productSnap = await getDoc(productDocRef)
        console.log(productSnap);
        setProductDetail({...productSnap.data(),id:productSnap.id})



    }

    getUserDetails()
    

    return(
    <div className="col-md-4 pb-1 pb-md-0 rcorners2 bg-light">
        <div>
            <div className="card-body">
            <h2 className="card-title">{ProductDetail.product_name}</h2>
                <button type="button" className="button-p3">{ProductDetail.product_type == "1"? "ส่งต่อ" : "ตามหา"}</button>
                <button type="button" className="button-p2">{ProductDetail.product_categ == "other"? ProductDetail.product_categ_others : ProductDetail.product_categ}</button>
                <p><small>{ProductDetail.product_price}</small></p>
                <p className="card-text">{ProductDetail.product_desc}</p>
                <img className="card-img-top" src={ProductDetail.pictureUrl} />

            </div> 
        </div>
    </div>)
}