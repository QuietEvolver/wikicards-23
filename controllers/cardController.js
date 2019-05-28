const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    console.log("findAllDeck's Card by DeckId", req.query )
    db.Deck.findOne({ _id: req.query.id }) //deckId sent to svr to isolate deck(populate:cards)
      .populate( "card")
      .exec()
      .then(function (dbDeck) {
        console.log("dbDeck: ", dbDeck)
        res.json(dbDeck);
      })
      .catch(function (err) {
        res.json(err);
      });
  },
  findById: function (req, res) {
    db.Card.findById(req.params.id)
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  },
  saveCard: function (req, res) {
    console.log("cardControllers saveCard(dbCard.save() working.js")
    const { card, deckId } = req.body;
    db.Card.findOne({id:card.id})
      .exec()
      .then(dbCard => {
        if(dbCard){
          console.log ("dbCard exists already", dbCard)
          return dbCard;
        } else {
          console.log ("dbCard creation", dbCard)
          return db.Card.create(card);
        }
      })
      .then(dbCard => dbCard.save())
      .then(dbCard => {
        console.log("dbCard is being added to Deck", dbCard)
        return db.Deck.findByIdAndUpdate( deckId, { $addToSet: { card: dbCard._id } }, { new: true })
      })
      .then(() => { res.json({ message: "Card Sent" }) })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Card.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Card.findById(req.params.id)
      .then(dbCard => dbCard.remove())
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  }
};
