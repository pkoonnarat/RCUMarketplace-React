import image from "./img/base.gif"
import { Link } from "react-router-dom";

const Landing = () => {
    return (<div><img src={image}></img>
    <div><Link to="/register">Register Here</Link></div>
    
    </div>

    );
}
 
export default Landing;