// TODO: DO NOT TOUCH THIS FILE. THIS WORKS
const db = require("../models");// Require all models as defined in db

///////////****************THIS IS HAS LAST AL.JS ON HISTORY */

//FCARD to card//05/21/18 S DROPPED FROM CARD VARS...DBL CHECK TO ENSURE MULTIGENERATIONS (accordion)
module.exports = function(app){

    app.post("/signup", function(req, res) {
        db.User.create(req.body)
            .then(function(dbUser) {
            res.json(dbUser);// If we were able to successfully create a User, send it back to the client
            })
            .catch(function(err) {
            res.json(err); // If an error occurred, send it to the client
        });
    });

    app.post("/login", function(req, res) {
        db.User.findOne({username: req.body.username})
        .then(function(dbUser) {
            res.json(dbUser);// If we were able to successfully login User, send it back to the client
        })
        .catch(function(err) {
            res.json(err); // If an error occurred, send it to the client
        });
    });

    // Route for saving/updating a User's associated Deck 
    // colon id === :id is a 'placeholder' for the unique identifier 'id' for the user.
    app.post("/deck/:id", function(req, res) {
    // Create a new Deck and pass the req.body to the entry
        db.Deck.create(req.body)
        .then(function(dbDeck) {
        // If a Deck was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Deck
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        // If a Deck was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.User.findOneAndUpdate({}, { $push: { decks: dbDeck._id } }, { new: true })
        .then(function(dbUser) {
            res.json(dbUser);// If we were able to successfully update an User, send it back to the client
        })
        .catch(function(err) {
            res.json(err); // If an error occurred, send it to the client
        });
    });
    });

    // use express(app) to create a post route called "/card/:id"
    // :id -> placeholder that is going to take in a deckId
    app.post("/card/:id", function(req, res){
        // reference from the Card schema from the db object that we import from models.
    // use .create takes in req.body that will post to the Card collection
    // sample req.body 
    // {
        // title: 'example title'
        // image: 'sample image url'
        // abstract: 'abstract text'
    //}
    db.Card.create(req.body) 
    .then(function(dbCard) {
        // dbCard will capture the value of the Card just created
        // find the deck via req.params.id
        return db.Deck.findOneAndUpdate({ _id: req.params.id }, { $push: { card: dbCard._id }}, { new: true });
        }).then(function(dbCard) {
            res.json(dbCard);// If we were able to successfully create Card, send it back to the client  
        }).catch(function(err) {
            res.json(err); // If an error occurred, send it to the client
        });
    });

    // //TO BE ABLE TO: return all: TODO: deck/user/card w/in their respective given id's as limitations
    // // Route for saving a new Deck to the db and associating it with a User

    // // Route to get all User's and populate them with their Decks
    app.get("/usercards/:userId", function(req, res) {
    // Find all users
    db.User.findOne({ _id: req.params.userId })
        // Specify that we want to populate the retrieved users with any associated decks
        .populate({
        path: 'deck',
        model: 'Deck',
        populate: {  //the cards populated with the decks with `$in.`.
            path: 'card',
            model: 'Card'
        }
        })
        .then(function(dbUser) {
        // If able to successfully find and associate all Users and Notes, send them back to the client
        // TODO: Send back json containing the user, deck, and card information
        res.json(dbUser);
        })
        .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
        });
    });

    // POST route for saving a new Book to the db and associating it with a Deck
    app.post("/submit", function(req, res) {
    // Create a new Book in the database
    db.Book.create(req.body)
        .then(function(dbBook) {
        // If a Book was created successfully, find one Deck (there's only one) and push the new Book's _id to the Deck's `books` array
        // { new: true } tells the query that we want it to return the updated Deck -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Deck.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
        })
        .then(function(dbDeck) {
        // If the Deck was updated successfully, send it back to the client
        res.json(dbDeck);
        })
        .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
        });
    });

    // Route for getting all books from the db
    app.get("/Card", function(req, res) {
    // Using our Card model, "find" every Card in our db
    db.Card.find({})
        .then(function(dbCard) {
        // If any Cards are found, send them to the client
        res.json(dbCard);
        })
        .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
        });
    });

    // Route for getting all libraries from the db
    app.get("/Deck", function(req, res) {
    // Using our Deck model, "find" every Deck in our db
    db.Deck.find({})
        .then(function(dbDeck) {
        // If any Libraries are found, send them to the client
        res.json(dbDeck);
        })
        .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
        });
    });

    // Route to see what Deck looks like WITH populating
    app.get("/populated", function(req, res) {
    // Using our Deck model, "find" every Deck in our db and populate them with any associated Card
    db.Deck.find({})
        // Specify that we want to populate the retrieved Deck with any associated card
        .populate("card")
        .then(function(dbDeck) {
        res.json(dbDeck);
        })
        .catch(function(err) {
        res.json(err);
        });
    });

}
