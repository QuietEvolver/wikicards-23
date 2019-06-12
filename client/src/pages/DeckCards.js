import React, { Component } from "react"; //library import as a component of the constructor class' direct child from app as a grandchild of App()
import Jumbotron from "../components/Jumbotron";//lns 2-7 w8-9 being app.grandchildren component import of said routes (may actually be a great granchild due to it being app/constructor/pages/compt)
import Card from "../components/Card";
import Deck from "../components/Deck"; //component that will dynamically render the cards being filled w API.data
import Form from "../components/Form/index"; // parent Form Object that will house all of the components housed w/in
//import Card from "../components/Deck"; //will be the data structure that will be rendered from the input from the use as the card constructor fxn
import Footer from "../components/Footer"; //Footer being used from the Constructo's Form Object class to be rendered dynamically on the App as it renders
import API from "../utils/API"; //calls form the API.js file housed in the utils from the routes for the information 'gotten' from the JSON.data parsed AJAX call
import { Col, Row, Container } from "../components/Grid"; // Grid.js:Component for Form: delineated React.App() jsx sections that will be the container class for the data parsing over to the atabase
import { List } from "../components/List";//list all of the items housed in the cards.Collection for the given User: can be (1) in collection or a list-item(x[i]) nums of cllxns
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component { // function calls and defines the Constructor 'class' being rendered for the Object Home{...props} which ultimately will populate the parent App()
  state = { //delineates the state origin of the App Constructor with giving it child.props: 
    cards: [], //this will be the indexed collection of cards set to an array of User["input"]
    q: "", //this is the query of the API call for the cards.data db table population; this si the input fieldo's original state set to an empty field string ""
    message: "Search For A Card To Begin!", //original state is diplay an input of text action from the user as a hard coded message
    turnOnDeckForm: false, 
    loadedCards: []// isolates current cards from new cards from server in state
  };

  handleInputChange = event => { //this is a handler based on the text input from the user <button> click.event.  Can also be an onkeyup/onkeydown/onkeypress, etc. event
    const { name, value } = event.target; //constant variable set to the name and value for the given target event of the handler. This syntax is called Object Deconstruction. We deconstruct the name and value keys from the event.target object
    this.setState({ //this is the flexible variable set to the isolated instance of the lexical scope for the values incoming setting the information of the handled change in state
      [name]: value///name is in bracket notation where it denotes the key being dynamic;  name is the dynamic parameter that updates as the state is set to the given input from the value of it's name key
    }); //closes the constant variable of the parameter method receiveing the value for for set state
  }; //this finalizes the handler actions for the action executions for target event

  getCards = () => { //this is fucntional promise to execute when information is needed
    //console.log(this.state.q, API);
    try {
      if (this.state.q.length === 0) throw new Error("No Searched Card Data Found, Try a Different Query");
    }
    catch (Err) {
      this.setState({//lexical $this is now set at the non-fxnl, 'error caught' state
      message: Err.message
      })
    }
    API.getCard(this.state.q)//the API inforrmation is read for the getCards function at the lexially scoped variable for this at the query's state at that given time
      .then(res => {//upon cRud.reading, the result is then returned as a spomise to set the current, originally read, current state 
        // console.log(res.data);
        const newCards = this.state.cards.slice();
        if( newCards.find(card => card.id === res.data.id) ) throw new Error( "This card is in existence.");
        newCards.push(res.data)
        this.setState({//as now set reflect the current state of the queried Cards with the incoming 
          cards: newCards, //res.data yielding the new setState val
          q: ""
        })// denotes the end of the incoming data at the promised instance of $this given setState()
      })
      .catch(() => //if there is an error in data receipt/function execution, error will be 'caught' in order to continue to execute the program fucntion instead of crashing the app
        this.setState({//lexical $this is now set at the non-fxnl, 'error caught' state
        message: "No New Cards Found, Try a Different Query"//message rendered in this field dynamically for this instance as the system cathes the erro and diplays a 'message' to the user scoped, set, and accessed in this block
        })//this closes the caught error block
      );//this closes the promised api call 
  };//this closes the get call function promise

  handleFormSubmit = event => {// this is a handled event from the button that submits the form to be written for the database as an 
    event.preventDefault(); //event set to be prevented default by the system to continue to run the handler event's execution in order to keep the app from crashing
    this.getCards();//the $this is the call to the getCards() fxn that set the state's promise call to the API fxnl event to receive the information as a parameter to be passed thorugh as a fuxnal api method call
  }; //closes the handled event triggered by the form submitted via the button set to trigger the API call  aka the promise known as the Get:getCards()fxn

  handleCardSave = (e, id) => {//e = event; this is a fxn block for the handler set to retriecve isolated instances of the cards delineated access though 'id' in the parsed info fed from the API to the db
    console.log(e, id, "Running handleCardSv Ln60");
    e.preventDefault();
    const card = this.state.cards.find(card => card.id === id); //a constant variable set to card at the lexically scoped $this to be assigned to the state of the cards collection to iterate through the .find/found (cards collection) as a promise to be found by the id of said cards housed throughout that cllx
    console.log(this.props);
    API.saveCard({ //the API call set in the API.js file will be setting the function to be executed as ssavecards open to receiving the follwoing key:value pairs as received and parsed via JSON
      card: {
        id: card.id, //googleId key set to the value card.id with card beign the table and the id being the identifier asssigned to is mirroring the key value pair so as to serve as a foeign key down the line
        title: card.title, //this data is cascaded and parsed as such in depth as denoted through deptths of dot notation/////parsed title key, for the card data with volumeInfo and the given title of the 
        abstract: card.abstract, //this is the parsed data abstract found at the third layer in/down from the main (*and only as it is only one call)  endpoint's entry
        uri: card.uri, //we are setting the incoming data point parameter named uri from the outside server to be named as 'uri' in our system's database and recognized as such
        confidence: card.confidence, // confidence' data parsed three layers in
        image: card.image //image set as a parameter key in our db received as parsed date 3 cascades in/down
      },
      deckId: this.props.location.state.deck._id //location from react.router.dom 
      // }).then((res) => { 
      //     const {data} = res;
      //     console.log(data)
      //     API.createDeck({
      //     name, cardId: data._id //deck name to card._id: data
      //   })
    }) //the parens closes the api outside parameter receipt.JSON info whcih then sets the then to be 'promised' the data write to lexical $this previously gotten.getcards() information be set to new state
  }; //closes out the saving hanlder function that writes to the database by sending data to the models(dbKey)/views(routing)/controllers(crud.db)

  getAllCards = () => {
    console.log(" this is the  this.props.location.state.deck._id  GetAllCards", this.props.location.state.deck._id)
    API.getAllCards(this.props.location.state.deck._id)
      .then(({ data }) => {
        console.log("this data: ", data);
        if(data) this.setState({ cards: data.card, loadedCards: data.card }); //checks loadedCards v cards.Id if same - fromDB so Hide save btn.
      })
  }
  componentDidMount() {
    console.log("this.props: ", this.props);
    this.getAllCards()
  }

  render() { //renders this information to the html of the app to be rendered client side dynamically wit hthe set 'parts' to be filled with the params defined withing and with  the entire file imported/exported
    return ( //to be returned when called upon in the given component space in the jsx
      <Container> {/*src/components/*/}
        <Jumbotron> {/* jumpotron displaying from the navigation navBar using the 'children' props for population*/}
        <h1 style={{fontSize:"4em"}}>{this.props.location.state.deck.name? this.props.location.state.deck.name: ""} </h1>
          <h1 className="text-center"> {/* header class called in */}
            <strong>Wikipedia Cards Search</strong> {/*located in the App page as a jumbotron which calls in the children props*/}
          </h1>{/*closes the jsx tags*/}
          <h2 className="text-center">Search, Click, and Save Cards of Interest to {this.props.location.state.deck.name}</h2> {/*opens and closes the jsx instrinsic element and gives it the Bstrp class for formatting*/}
          <FontAwesomeIcon icon={faSearch} size="4x"/>
        </Jumbotron>{/*closes the jsx tags for the imported files exported from the Form/Jumbotron folder*/}
        <Form
          handleInputChange={this.handleInputChange} //<b: handlers; from the form
          handleFormSubmit={this.handleFormSubmit}   //<b:   "  " : form the handler
          q={this.state.q} //q is the query input by the user
        />  {/*closes the jsx tags for the single Form tag*/}
        <div> {/* Card form coming in from the files house w/in form calling in setting a text titled 'Results */}
          {this.state.cards.length !== 0 ? ( // the lexically scoped 'this' is set to the current state of cards and asks to evaluate the length conditionally
            <div className="card-container"> {/* bringing in the list component*/}
              {this.state.cards.map(card => ( // this will iterate and 'map', hitting every endpt on the list for the card rendered object(s)
                <Card
                  key={card.id} //sets the key for us with the api info received from the json: card.id
                  firstTimeNewCardLoad={this.state.loadedCards.find(loadedCard => loadedCard.id===card.id) ? true : false} //passes to card component to hide/show any or anything pertaining to first time a new card loads on page;
                  id={card.id}
                  title={card.title}// received from the api cards render delving into the depths of the endpoint's object parameter all constructed with the value card.volumeInfo
                  abstract={card.abstract}//this next subparameter hit was for abstract
                  image={card.image} //link is provided to us by the following dot notated field infoLink
                  confidence={card.confidence}//yields the probability of the search being qualitative in result
                  uri={card.uri}//gives a link
                  // DeckButton={() => ( //Button handler to have the cards with an id. 
                  //   <button
                  //     onClick={() => this.handleCardSave(card.id)}//button handler
                  //     className="btn btn-primary ml-2"
                  //   >
                  //     Search Decks and Save
                  //   </button>
                  // )}
                  handleCardSave={(e) => this.handleCardSave(e, card.id)}//we are passing properties v components so btn can 'hide'}
                />
              ))}
            </div>
          ) : (
              <h2 className="text-center">{this.state.message}</h2> //??? delineates the default || value of setting the message to user as "pls enter a card to search"  or... ".catch(err)==>"message: "api fail/no resutls"
            )}{/* : else the following conditionally rendered message for the given $this*/}
        </div>
        <Footer />
      </Container>
    );
  }
}
