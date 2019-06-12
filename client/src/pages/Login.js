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

class Login extends React.Component {
    constructor(props) { //passes props down into contructor then passes into super to be inherited by react component
        super(props);
        this.state = { username: "", password: "", loggedIn: false, user: null }; //bind states to values (*2way binding Ln16/17)
        this.handleChange = this.handleChange.bind(this); //binding 'this' class
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleChange(event, name) {  //event comes with object upon triggering of.
        this.setState({ [name]: event.target.value }) //[ js6Var ]: as variable key;
    }

    handleSignIn() {
        console.log("Signing In.");
        axios.post("/login", { username: this.state.username, password: this.state.password })
            .then(res => {
                this.setState({ user: res.data.user }) //gets user obj from data&sent to user obj & client
                setTimeout(() => {
                    this.setState({ loggedIn: true }) //state needs to track login so as to redirect to DeckPg for deck creation
                }, 1000)
            }).catch(err => {
                console.log(err, "error");
            })
    }

    render() {
        const{classes}=this.props;
        return (
            <div>
                {this.state.loggedIn ?
                    <Redirect to={{ pathname: "/", state: { user: this.state.user } }} /> : null
                }
                <Paper>
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
                                SignIn
                        </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}
export default withStyles(styles)(Login);