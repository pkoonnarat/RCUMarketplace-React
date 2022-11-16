import { Component } from "react";


class BottomNavBar extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
    <nav class="navbar fixed-bottom navbar-light cu-accent-color">
        <a class="navbar-brand" href="#">Fixed bottom</a>
    </nav>

      );
    }
}
 
export default BottomNavBar;