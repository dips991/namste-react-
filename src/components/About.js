import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {      
    constructor(props){
        super(props);

        //console.log("parent constructor")
    }
    componentDidMount(){
        //console.log("parent component did mount");
    }
    render(){
      //  console.log("parent render");
    return (
        <div>
            <h1>About</h1>
            <h2>This is Namaste React WebSeries</h2>
            <UserClass name={"first"} location = {"Dehradun Class"}/>
        </div>
    );
}
}

export default About;