import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                name : "Dummy",
                location: "Default",    
            },
        };
        //console.log(this.props.name + "childConstructor");
    }

    async componentDidMount(){
        //console.log(this.props.name + "child components did mount");

        //Api call
        const data = await fetch("https://api.github.com/users/dips991");
        const json = await data.json();
        
       this.setState({
        userInfo:json,
       });

        console.log(json);
    }
   componentDidUpdate(){
    console.log("component Did Update");
   }
   componentWillUnmount(){
    console.log("component will unmount");
   }
    render(){
                
      //  console.log(this.props.name + "child render");
      const{name, location, avatar_url} = this.state.userInfo;
        return (
        <div className="user-card">
            <img src={avatar_url}/>
           <h2>Name:{name}</h2>
            <h3>Location: {location}</h3>

            <h4>Contact: dipak.deshmukh1911@gmail.com</h4>
        </div>
        );
    }
}
export default UserClass;

/****
 * ---mounting---
 * 
 * constructor(dummy)
 * render(dummy)
 *   <HTML Dummy>
 * component did mount 
 *   <API Call>
 *   <this.setState> -> state variable is updated
 * 
 * ---UPDATE
 * 
 *  render(API data)
 * <HTML (new API data)>
 * componentdid update
 * 
 */