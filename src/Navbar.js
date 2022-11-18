import "./css/bootstrap-4.4.1.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    console.log("Nav bar runs");
    return (

    <nav class="navbar fixed-top navbar-light cu-accent-color rounded-navbar">
        <a className="navbar-brand" href="/">Routing bar for demo</a>
        <Link to="/register">Register</Link>
        <Link to="/productcontainer">ProductContainer (DO NOT RUN)</Link>
        <Link to="/post">Post Box</Link>
        <Link to="/demo">IMG UPload</Link>
    </nav>
    
    );
}
 
export default Navbar;