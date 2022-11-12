import { Component } from "react";
import { Route,Router,BrowserRouter } from "react-router-dom";
import "./css/bootstrap-4.4.1.css"
import defaultimg from "./img/image-4.jpeg"


class ProductContainer extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (<div className="col-md-4 pb-1 pb-md-0 rcorners2">
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Item 1</h5>
                <button type="button" className="button-p3">Tag1</button>
                <button type="button" className="button-p2">Tag2</button>
                <button type="button" className="button-p1">Tag3</button>
                <p className="card-text">Lorem ipsum spiderman foreskin ok chinese nibba dinosaur.</p>
                <img className="card-img-top" src={defaultimg} width="200" height="200" />

            </div> 
        </div>
    </div>);
    }
}
 
export default ProductContainer;