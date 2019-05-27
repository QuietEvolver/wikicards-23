import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Deck from "../components/Deck";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    cards: []
  };

  componentDidMount() {
    this.getSavedCards();
  }

  getSavedCards = () => {
    API.getSavedCard()
      .then(res =>
        this.setState({
          cards: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleCardDelete = id => {
    API.deleteCard(id).then(res => this.getSavedCards());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(User) Deck Collections Cards Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Collections of Interest.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Deck title="Saved Decks" icon="download">
              {this.state.cards.length ? (
                <List>
                  {this.state.cards.map(card => (
                    <Card
                      key={card._id}
                      title={card.title}
                      subtitle={card.subtitle}
                      link={card.link}
                      authors={card.authors.join(", ")}
                      description={card.description}
                      image={card.image.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleCardDelete(card._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Cards</h2>
              )}
            </Deck>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
