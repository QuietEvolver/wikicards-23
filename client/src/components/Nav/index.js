import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import images from "../../images/collections.jpg";
import axios from "axios";
console.log(images, "pics");

export default class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth, 
    loggedOut: false
  };

  handleLogout = () => {
    axios.get( "/logout" )
    .then( res => {
      if(res.status===200){
          this.setState({ loggedOut:true })
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
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        {/* { this.state.loggedOut && this.props.location.state ? <Redirect to="/login" /> : null } */}
        <Link className="navbar-brand" to="/">
        <div style={style}>
        <div style={{marginTop:75}}>WikiCard</div>
        </div>
        {/*  <h1 style={{fontWeight:"bolder"}}> Your Deck Collections </h1>*/}
        </Link>
        <Link to="/sign_up">
          <div>
            Sign Up
          </div>
        </Link>
        {/* { this.props.location.state ? 
        <div onClick={this.handleLogout.bind(this)}>
          <div> Logout</div>
        </div> :  */}
        <Link to="/login">
          <div>
            Login
          </div>
        </Link>
        {/* } */}
        {/* <button //tbd in native
          onClick={this.toggleNav}
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        {/* <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/home" ? "nav-link active" : "nav-link"}
                to="/home"  //note:'/home' fka '/saved' 
              >
                Saved
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    );
  }
}

