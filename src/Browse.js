import FirebaseService from "./FirebaseService";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import ProductContainer from "./ProductContainer";


export default function Browse(){
    const [productCol, setProductCol] = useState({});
    const [done,setDone] = useState(false);

    const getCollection = async () => {
        const db = FirebaseService()
        const productColRef = collection(db, "products")
        const data = await getDocs(productColRef)
        setProductCol(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        setDone(true)
    }

    useEffect((() => {
        getCollection()
    }),[])

    useEffect(() => {
        console.log(productCol)
    }, [productCol]);


    return(<div>
        {done? productCol.map((product) => {
            return <ProductContainer productProp={product}/>
        }):<div/>}
        
        </div>);
}