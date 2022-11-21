
import "./css/bootstrap-4.4.1.css"

import { Link } from "react-router-dom";


export default function OrderContainer({productProp}){
    
    return(
    <div className="col-md-4 pb-1 pb-md-0 rcorners2 bg-light">
        <Link to="" style={{ color: '#000' }}>
        <div>
            <div className="card-body">
            <h2 className="card-title">{productProp.product_name}</h2>
                {productProp.product_pic ? <img className="card-img-top" src={productProp.product_pic} /> : <br/> }
            โดย : {productProp.creator_name} <br/>
            ถึง : {productProp.target_name}  <br/>
            ออเดอร์เมื่อ : {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(productProp.created_time)}
            </div> 
        </div>
        </Link>
    </div>)
}