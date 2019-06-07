const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        console.log("DeckControllers are working.js");
        db.User.findById(req.query.id)
            .populate("deck")
            .exec()
            .then(user => {
                res.json({ deck:user.deck })
            })
        // db.Deck.find()//req.query)
        //     .then(dbDeck => res.json(dbDeck))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Deck.findById(req.params.id)
            .then(dbDeck => res.json(dbDeck))
            .catch(err => res.status(422).json(err));
    },
    saveDeck: function (req, res) {
        console.log("DeckControllers saveDeck(dbDeck.save() working.js")
        // db.Deck.countDocuments({ name: req.body.name }
        // ).then(count => {
            // console.log(typeof count)
            // if (count == 0) {
            //     console.log("inside the count fxn")
            //     return db.Deck.create({ name: req.body.name })//, cards: [req.body.cardId] }//deck.name, w/new card's id $pushed in[]
            // }
      //  })
      console.log(req.body);
    let newDbDeck; //create global var then assign to definition below
      db.Deck.findOne({ name: req.body.name })
      .exec()
      .then(dbDeck => { 
          if( !dbDeck ){
              return db.Deck.create({ name: req.body.name })
          }
      })
            // .then(dbDeck => dbDeck.save())
            .then(dbDeck => {
                newDbDeck=dbDeck;
                console.log("dbDeck create", dbDeck)
                return db.User.findByIdAndUpdate( req.body.id, { $addToSet: { deck:dbDeck._id }} );
                
            }) .then( () => { 
                res.json( newDbDeck); //update user's deck then return new deck to client 
            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Deck.findOneAndUpdate({ id: req.params.id }, req.body)
            .then(dbDeck => res.json(dbDeck))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Deck.findById(req.params.id)
            .then(dbDeck => dbDeck.remove())
            .then(dbDeck => res.json(dbDeck))
            .catch(err => res.status(422).json(err));
    }
};
//         return db.User.findOneAndUpdate({}, { $push: { decks: dbDeck._id } }, { new: true })
//       .then(function(dbUser) {
//         res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//       })
//       .catch(function(err) {
//         res.json(err); // If an error occurred, send it to the client
//       });
//   });
//////////

// Route for saving/updating an User's associated Deck 
// colon id === :id is a 'placeholder' for the uniqu identifier 'id' for the user.
// app.post("/deck/:id", function(req, res) {
//   db.Deck.create(req.body)
//     .then(function(dbDeck) {
//         return db.User.findOneAndUpdate({}, { $push: { decks: dbDeck._id } }, { new: true })
//       .then(function(dbUser) {
//         res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//       })
//       .catch(function(err) {
//         res.json(err); // If an error occurred, send it to the client
//       });
//   });
// });