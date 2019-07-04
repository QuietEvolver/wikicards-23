import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = { 
    textField:{
        marginLeft: 10,
        marginRight: 10
    },
    button:{
        margin:10
    }
};

class SignUp extends React.Component {
    constructor(props) { //passes props down into contructor then passes into super to be inherited by react component
        super(props);
        this.state = { username: "", password: "", signup: false, message: "" }; //bind states to values (*2way binding Ln16/17)
        this.handleChange = this.handleChange.bind(this); //binding 'this' class
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleChange(event, name) {  //event comes with object upon triggering of.
        this.setState({ [name]: event.target.value }) //[ js6Var ]: as variable key;
    }


    handleSignIn() {
        console.log("Signing In.");
        axios.post("/sign_up", { username: this.state.username, password: this.state.password })  //calls server route 
            .then(res => {
                console.log("res", res); //should be redirected before this ever displays
                if (res.status !== 200){
                    console.log(res.data);
                    throw new Error(res.data.message)
                }
                this.setState({message:res.data.message})
                setTimeout( ()=>{
                   this.setState({ signup: true });
                    // window.location.href="/sign_up_r"; //redirect handles extra logic to move from sign-up to login page 
                }, 2000)
            })
            .catch( err => {
                console.log(err);
                this.setState({message:"User already exists. Please login or sign up with a new user."})
            })
    }

    render() {
        const{classes}=this.props;
        return (
            <div>
                {this.state.signup ? <Redirect to="/login" /> : null}
                <Paper>
                    {this.state.message.length>0 ? <p>{this.state.message}</p>: null }
                    <form autoComplete="off" noValidate >
                        <TextField
                            required
                            id="filled-name"
                            label="Name"
                            defaultValue="Enter Your Username"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={(e) => { this.handleChange(e, 'username') }}
                            margin="normal"
                            variant="filled"
                        />
                        <TextField
                            required
                            id="filled-name"
                            label="Password"
                            type="password"
                            defaultValue="Enter Your Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={(e) => { this.handleChange(e, 'password') }}
                            margin="normal"
                            variant="filled"
                        />
                        <div onClick={this.handleSignIn}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Sign Up
                        </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}
export default withStyles(styles)(SignUp);
