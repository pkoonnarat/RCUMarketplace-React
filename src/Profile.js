import AuthContext from "./ContextProvider"
import { useContext } from "react"
import { ProductListContext } from "./App"
import ProductContainer from "./ProductContainer"
import { useState } from "react"
import { useEffect } from "react"
import FirebaseService from "./FirebaseService"
import { collection, getDocs, query, where } from "firebase/firestore"
import OrderContainer from "./OrderContainer"


export default function Profile(){
    const {auth} = useContext(AuthContext)
    const [buttonActive, setButtonActive] = useState(false)
    const {productList} = useContext(ProductListContext)
    const [orderList,setOrderList] = useState({})
    console.log(productList)
    var userPosted = productList.filter( function(product){return (product.user_id===auth.userID)})

    const productClick = () => {
        setButtonActive(false)
    }
    

    const orderClick = () => {
        setButtonActive(true)

    }

    useEffect(() => {
        async function fetchorder(){
            const db = FirebaseService()
            const usersCollectionRef = collection(db, "order");

            const q = query(usersCollectionRef, where("creator_id","==",auth.userID.toString()))
            const qSnapshot = await getDocs(q).then()
            console.log(qSnapshot)
            const orderArr = []
            qSnapshot.forEach(doc => {
                console.log("doc ---- ",doc.data())
                orderArr.push(doc.data())
            })
            setOrderList(orderArr)
        }

        fetchorder()

    },[])

    return(
        <>
        <div class="container rcu-light-color">
  <header>{auth.FSUsername}</header>
</div>
	<img src={auth.pictureUrl} class="rounded-circle" width="100" height="100" alt=""/> 
	<hr/>
<div class="container row align-content-center">
    <button type="button" class={"btn btn-outline-dark btn-lg" + (buttonActive === false ? 'active' : "" )} style={{margin:0,marginLeft:"auto",marginTop:0,marginRight:"1rem"}} onClick={productClick}>สินค้า</button>

    <button type="button" class={"btn btn-outline-dark btn-lg" + (buttonActive === true ? 'active' : "" )} style={{margin:0,marginRight:"auto",marginTop:0,marginLeft:"1rem"}} onClick={orderClick}>ออเดอร์</button>
	
	</div>
<div>
	{buttonActive === false? userPosted.map((product) => {
            return (<>
            <ProductContainer productProp={product}/>
            <button className="btn btn-danger btn-sm" >ลบ</button>
            </>)
        }) : orderList.map((product) => {
            return <OrderContainer productProp={product}/>
        }) }
	</div>
    </>

    )
}