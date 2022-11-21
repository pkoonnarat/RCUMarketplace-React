
import "./css/bootstrap-4.4.1.css"

import { Link } from "react-router-dom";


export default function ProductContainer({productProp}){
    const url = "/product/"+ productProp.id
    return(
    <div className="col-md-4 pb-1 pb-md-0 rcorners2 bg-light">
        <Link to={url} style={{ color: '#000' }}>
        <div>
            <div className="card-body">
            <h2 className="card-title">{productProp.product_name}</h2>
                <button type="button" className="button-p3">{productProp.product_type === "1"? "ส่งต่อ" : "ตามหา"}</button>
                <button type="button" className="button-p2">{productProp.product_categ === "other"? productProp.product_categ_others : productProp.product_categ}</button>
                <p><small>{productProp.product_price}</small></p>
                <p className="card-text">{productProp.product_desc}</p>
                {productProp.pictureUrl ? <img className="card-img-top" src={productProp.pictureUrl} /> : <br/> }

            </div> 
        </div>
        </Link>
    </div>)
}