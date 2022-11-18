import { Component } from "react";
import {AiFillHome, AiOutlinePlusSquare} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

class BottomNavBar extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
    <nav class="navbar fixed-bottom navbar-light rcu-light-color">
        <IconContext.Provider value={{color:"black",size:"2em"}}>
            <Link to="/browse"><AiFillHome/></Link>
            <Link to="/post"><AiOutlinePlusSquare/></Link>
            <Link to="/profile"><FaUserAlt/></Link>
        </IconContext.Provider>
    </nav>

      );
    }
}
 
export default BottomNavBar;