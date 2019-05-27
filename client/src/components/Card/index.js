import React from "react"; //imports react from the react library
import ReactCardFlip from "../ReactCardFlip.jsx";
//import { ListItem } from "../List"; //imports the functionality of grand-child.ListItem component of sibling List
//import { Row, Col } from "../Grid";// imports   ''      ''      '' grandchildren.Row&.Col     ''    Grid
//import Form from "../Form";
import "./style.css";//imports stylesheet from same directorory


export default class Card extends React.Component { //Card consists of deconstructed { props body }//{ title, abstract, confidence, uri, image, SaveButton }
  state = {
    isFlipped: false
  };

  handleCardClick = event => {// FKA: 'handleDeckCreateSaveonClick this is a handled event from the button that submits the form to be written for the database as an 
    this.setState( prevState => ({
      isFlipped: !prevState.isFlipped //if T will = F b/c of bang
    })
    );
  }; //closes the handled event triggered by the form submitted via the button set to trigger the API call  aka the promise known as the Get:getCards()fxn

  render() {
    const { id, title, abstract, confidence, uri, image, SaveButton } = this.props; //, handleInputChange, handleCardSave, q; bc we have not fxn, all attr are gotten from pty; will add components to Form to round out dyanmic formation.
    return (  //fxnCard returns the follwoing render from the page
      <ReactCardFlip isFlipped={this.state.isFlipped} infinite>
      <div key="front" className="card" onClick={this.handleCardClick.bind(this)} > {/*jsx transpiled by babel continued throughout .js pages rendering html<-->js; //imports the functionality of grand-child.div component of sibling List*/}
        <h3 className="font-italic">{title}</h3> {/* the title prop component of the dom has preferred font(s) being set*/}
        {/* {abstract && <h5 className="font-italic">{abstract}</h5>} abstract updated to set state here */}
        <img className="img-thumbnail img-fluid w-100" src={image} alt={title} />
        {/* img called setting sizes with the source being the prop image and the alt of the img tage being set to the prop.title of the Card object's class */}
          <a target="_blank" rel="noopener noreferrer" href={uri}>{/*a light Savebutton color set fort he anchor tack for _private class protected _blank*/}
            View {/* text will be rendered on dom upon creation from virtualdom ot dom window */}
          </a> {/*closes the anchor tag */} 
          <SaveButton />
          </div>
          {/* <button
                onClick={() => this.handleCardClick()}//button handler
                className="btn btn-primary ml-2"
              >
                Save
              </button> */}
          {/* renders a dyanmic react Savebutton tag */}
         <div key="back" className="card" onClick={this.handleCardClick.bind(this)} >
        <p className="font-italic small">Confidence in Quality Return(s) {confidence ? confidence.$numberDecimal : 0}
        </p>{/* paragraph tags open/close set w/btsp fonts getting data to prop and static text displayed */}
        <p>{abstract}</p>{/* paragraph opn close tags for Book.prop obj descroption parameter */}       
      </div> 
    </ReactCardFlip>
    );
  }
}



// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// 

// export default class RevolvingExample extends Component  {
//   constructor() {
//     super();
//     this.state = {
// 			isFlipped: false
// 		};
// 		this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event) {
// 		event.preventDefault();
// 		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
// 	}

//   render() {
//     return (
//       <ReactCardFlip isFlipped={this.state.isFlipped} infinite>
//         <div key="front" style={this.props.styles.card}>
//           <img
//             style={this.props.styles.image}
//             src="//static.pexels.com/photos/59523/pexels-photo-59523.jpeg"
//           />

//           <button onClick={this.handleClick}>
//             Flip Card
//           </button>
//         </div>

//         <div key="back" style={this.props.styles.card}>
//           <img
//             style={this.props.styles.image}
//             src="//img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr06/4/16/enhanced-11136-1396643149-13.jpg?no-auto"
//           />

//           <button onClick={this.handleClick}>
//             Flip Card
//           </button>
//         </div>
//       </ReactCardFlip>
//     );
//   }
// };

// RevolvingExample.propTypes = {
//   styles: PropTypes.object
// };
