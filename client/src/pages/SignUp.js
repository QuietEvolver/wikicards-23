import React from "react";
import { Link } from "react-router-dom";
//import Form from "../components/Form"

export default class Login extends React.Component{
constructor( props ){ //passes props down into contructor then passes into super to be inherited by react component
    super( props );
    this.state = { userName: "", password: ""}; //bind states to values (*2way binding Ln16/17)
    this.handleChange = this.handleChange.bind( this ); //binding 'this' class
    this.handleSignIn = this.handleSignIn.bind ( this );
}

handleChange ( event, name ) {  //event comes with object upon triggering of.
    this.setState({[ name ]: event.target.value }) //[ js6Var ]: as variable key;
}

handleSignIn() {
    console.log("Signing In.");
}

render() {
    return ( 
        <div>
            <form>
                <input type="text" placeholder="Enter your User Name" value={ this.state.userName }
                    onChange={ e => {this.handleChange(e, "userName")}}/> 
                <input type="password" placeholder="Enter your Password" value={ this.state.password }
                    onChange={ e => { this.handleChange(e,"password")}}/>
                <button type="button" onClick={ this.handleSignIn }>Sign Up</button>
            </form>
        </div> 
    )    
}}
