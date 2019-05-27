import React from "react"; //imports react from the react library
import { ListItem } from "../List"; //imports the functionality of grand-child.ListItem component of sibling List
import { Row, Col } from "../Grid";// imports   ''      ''      '' grandchildren.Row&.Col     ''    Grid
import Form from "../Form";
import "./style.css";//imports stylesheet from same directorory

export default class Card extends React.Component { //Card consists of deconstructed { props body }//{ title, abstract, confidence, uri, image, SaveButton }
state = { 
  turnOnDeckForm: false
};

handleDeckCardSave = event => {// FKA: 'handleDeckCreateSaveonClick this is a handled event from the button that submits the form to be written for the database as an 
  this.setState({
    turnOnDeckForm: true
  });
}; //closes the handled event triggered by the form submitted via the button set to trigger the API call  aka the promise known as the Get:getCards()fxn

render() {
  const  { id, title, abstract, confidence, uri, image, SaveButton }  = this.props; //, handleInputChange, handleCardSave, q; bc we have not fxn, all attr are gotten from pty; will add components to Form to round out dyanmic formation.
  return (  //fxnCard returns the follwoing render from the page
    <ListItem> {/*jsx transpiled by babel continued throughout .js pages rendering html<-->js; //imports the functionality of grand-child.ListItem component of sibling List*/}
      <Row className="flex-wrap-reverse"> {/* calls in a bootrrap funciton*/}
        <Col size="md-8">{/* bootstrap container function con't*/}
          <h3 className="font-italic">{title}</h3> {/* the title prop component of the dom has preferred font(s) being set*/}
          {abstract && <h5 className="font-italic">{abstract}</h5>} {/* abstract updated to set state here */}
        </Col>{/*col fxn called in from said import above*/}
        <Col size="md-4">{/*bootstrap set size on the fxn import Col */}
          <div className="btn-container"> {/*Savebutton for the div container set by bootstrap for looks */}
            <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={uri}>{/*a light Savebutton color set fort he anchor tack for _private class protected _blank*/}
              View {/* text will be rendered on dom upon creation from virtualdom ot dom window */}
            </a> {/*closes the anchor tag */}
            {/* <button
                onClick={() => this.handleDeckCardSave()}//button handler
                className="btn btn-primary ml-2"
              >
                Save
              </button> */}
              <SaveButton />
             {/* renders a dyanmic react Savebutton tag */}
          </div> {/* closing div tag */}
        </Col> {/* closing grandchild column tag */}
      </Row> {/* closing granchild row tag */}
      <Row>{/* opening Row tag */}
        <Col size="md-6"> {/* bootstrap container function con't*/}
          <p className="font-italic small">Confidence in Quality Return(s) { confidence ? confidence.$numberDecimal : 0 }
          </p>{/* paragraph tags open/close set w/btsp fonts getting data to prop and static text displayed */}
        </Col>{/* closing grandchild column tag */}
      </Row>{/* closing granchild row tag */}
      <Row>{/* opening Row tag */}
        <Col size="12 sm-4 md-2"> {/* bootstrap container function con't*/}
          <img className="img-thumbnail img-fluid w-100" src={image} alt={title} />{/* img called setting sizes with the source being the prop image and the alt of the img tage being set to the prop.title of the Card object's class */}
        </Col>{/* closing grandchild column tag */}
        <Col size="12 sm-8 md-10"> {/* bootstrap container function con't*/}
          <p>{abstract}</p>{/* paragraph opn close tags for Book.prop obj descroption parameter */}
        </Col>{/* closing grandchild column tag */}
      </Row>{/* closing granchild row tag */}
    </ListItem> // ListItem from App.granchild closing tag closing the JSX portion
  );
  }
}
