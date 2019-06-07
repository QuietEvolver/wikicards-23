import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios"

export default class Login extends React.Component{
constructor( props ){ //passes props down into contructor then passes into super to be inherited by react component
    super( props );
    this.state = { username: "", password: "", loggedIn:false, user:null }; //bind states to values (*2way binding Ln16/17)
    this.handleChange = this.handleChange.bind( this ); //binding 'this' class
    this.handleSignIn = this.handleSignIn.bind ( this );
}

handleChange ( event, name ) {  //event comes with object upon triggering of.
    this.setState({[ name ]: event.target.value }) //[ js6Var ]: as variable key;
}

handleSignIn() {
    console.log("Signing In."); 
    axios.post( "/login", {username:this.state.username, password:this.state.password})
        .then(res=>{
            this.setState({ user:res.data.user }) //gets user obj from data&sent to user obj & client
            setTimeout(() => {
                this.setState({ loggedIn: true }) //state needs to track login so as to redirect to DeckPg for deck creation
            }, 1000)
        }) .catch(err => {
            console.log(err, "error");
        })
}

render() {
    return ( 
        <div>
            { this.state.loggedIn ? 
            <Redirect to={ {pathname:"/", state:{user:this.state.user} }}/> : null
            }
            <form>
                <input type="text" placeholder="Enter your User Name" value={ this.state.username }
                    onChange={ e => {this.handleChange(e, "username")}}/> 
                <input type="password" placeholder="Enter your Password" value={ this.state.password }
                    onChange={ e => { this.handleChange(e,"password")}}/>
                <button type="button" onClick={ this.handleSignIn }>SignIn</button>
            </form>
        </div> 
    )    
}}
