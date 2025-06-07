import React,{Component} from "react";
import {Link} from "react-router-dom"
class NotFound extends Component {

    render() { 
        return (
            <div>
            <title>Page Notfoud</title>
              <h1 style={{textAlign:"center",marginTop:"180px",fontSize:"100px"}}>404</h1>
              <p className="text-center"><Link to="/">Back To Home Page</Link></p>
            </div>
          );
    }
}
 

export default NotFound;