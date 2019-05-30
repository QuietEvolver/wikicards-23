import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import Deck from "../components/Deck";
import Footer from "../components/Footer";
import API from "../utils/API";
//import { Col, Row, Container } from "../components/Grid";
import Form from "../components/Form/index"; // parent Form Object that will house all of the components housed w/in
//import { List } from "../components/List";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default class DeckPage extends Component {
  state = {
    decks: [],
    q: ""
  };

  createDeck = (name) => {  //deck:name
    API.createDeck(name)
      .then(({ data }) => {
        console.log("data: ", data, data.length, "data.Length");
        if (data.length !== 0) {
          let newDecks = this.state.decks.slice();
          newDecks.push(data);
          this.setState({ decks: newDecks });//calling state name to change; temp obj
        }
      })
  }

  componentDidMount() {
    this.getAllDecks();
  }

  getAllDecks = () => {
    API.getAllDecks()
      .then(res =>
        this.setState({
          decks: res.data
        })
      )
      .catch(err => console.log(err));
  };

  //   handleDeckDelete = id => {
  //     API.deleteDeck(id).then(res => this.getAllDecks());
  //   };

  handleInputChange = event => { //this is a handler based on the text input from the user <button> click.event.  Can also be an onkeyup/onkeydown/onkeypress, etc. event
    const { name, value } = event.target; //constant variable set to the name and value for the given target event of the handler. This syntax is called Object Deconstruction. We deconstruct the name and value keys from the event.target object
    this.setState({ //this is the flexible variable set to the isolated instance of the lexical scope for the values incoming setting the information of the handled change in state
      [name]: value///name is in bracket notation where it denotes the key being dynamic;  name is the dynamic parameter that updates as the state is set to the given input from the value of it's name key
    }); //closes the constant variable of the parameter method receiveing the value for for set state
  }; //this finalizes the handler actions for the action executions for target event

  handleFormSubmit = event => {// this is a handled event from the button that submits the form to be written for the database as an 
    event.preventDefault(); //event set to be prevented default by the system to continue to run the handler event's execution in order to keep the app from crashing
    this.createDeck(this.state.q);//it will pass the fxn and the desired deck name
  }; //closes the handled event triggered by the form submitted via the button set to trigger the API call  aka the promise known as the Get:getCards()fxn



  render() {
    console.log(this.state.decks.length);
    return (
      <div style={{ position: "relative" }}>

        <div className="page-container">
          <div>
            <h1>Create and View Decks</h1>
            <h2>Name Your Deck and Click on a Deck to Create New Cards</h2>
            <FontAwesomeIcon icon={faSearch} size="4x" />
          </div>
          {/* <h2 className="text-center">Create and Save Collections of Interest.</h2> */}
          <Form
            handleInputChange={this.handleInputChange} //<b: handlers; from the form
            handleFormSubmit={this.handleFormSubmit}   //<b:   "  " : form the handler
            q={this.state.q} //q is the query input by the user

          />  {/*closes the jsx tags for the single Form tag*/}
          <div className="deck-container">
            {this.state.decks.map(deck => <Link key={deck._id} to={{ pathname: "/deck/" + deck.name, state: { deck } }}> <Deck name={deck.name} icon="download" id={deck._id} /> </Link>
            )
            } </div>

          <Footer />
        </div>
      </div>
    );
  }
}
