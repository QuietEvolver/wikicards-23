import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends React.Component{
constructor( props ){ //passes props down into contructor then passes into super to be inherited by react component
    super( props );
    this.state = { username: "", password: "", signup: false }; //bind states to values (*2way binding Ln16/17)
    this.handleChange = this.handleChange.bind( this ); //binding 'this' class
    this.handleSignIn = this.handleSignIn.bind ( this );
}

handleChange ( event, name ) {  //event comes with object upon triggering of.
    this.setState({[ name ]: event.target.value }) //[ js6Var ]: as variable key;
}


handleSignIn() {
    console.log("Signing In.");
    axios.post("/sign_up", { username:this.state.username, password:this.state.password })  //calls server route 
        .then(res => {
            console.log("res", res); //should be redirected before this ever displays
            this.setState({ signup:true });
            // window.location.href="/sign_up_r"; //redirect handles extra logic to move from sign-up to login page
        })
}

render() {
    return ( 
        <div>
            { this.state.signup ? <Redirect to="/login"/> : null }
            <form>
                <input type="text" placeholder="Enter your User Name" value={ this.state.username }
                    onChange={ e => {this.handleChange(e, "username")}}/> 
                <input type="password" placeholder="Enter your Password" value={ this.state.password }
                    onChange={ e => { this.handleChange(e,"password")}}/>
                <button type="button" onClick={ this.handleSignIn }>Sign Up</button>
            </form>
        </div> 
    )    
}}
