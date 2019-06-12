import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

const style = {
  color: "white", 
  backgroundColor: "black",
  width: "100vw",
  height: "300px", 
  fontSize: "5em",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center"
}

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value: 0
    };
    this.handleChange=this.handleChange.bind(this); 
  }

  handleChange(event, newValue) {
   this.setState({value:newValue})
  }

  handleLogout = () => {
    axios.get( "/logout" )
    .then( res => {
      if(res.status===200){
          setTimeout(() => {this.props.history.push("/login")}, 1000)
      }
    })
  }

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  componentDidUpdate() {
     //code for nav state post logout for logging in to same user; Ln.63; Ln.75-78/84
  }

 render() {
    return (
    <Paper>
        <Link to="/">
        <div style={style}>
        <div style={{marginTop:75}}>WikiCard</div>
        </div>
        {/*  <h1 style={{fontWeight:"bolder"}}> Your Deck Collections </h1>*/}
        </Link>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link to="/sign_up">
          <Tab label="Sign Up" />      
        </Link>
        { this.props.location.state ? 
        <div style={{cursor:"pointer"}}onClick={this.handleLogout.bind(this)}>
        <Tab label="Log Out" />
        </div> : 
        <Link to="/login">
        <Tab label="Log In" />
        </Link>
        }
          
      </Tabs>
    </Paper>
  );
 } 
 
}
