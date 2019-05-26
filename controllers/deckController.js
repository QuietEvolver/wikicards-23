const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log("DeckControllers are working.js")
    db.Deck.find(req.query)
      .then(dbDeck => res.json(dbDeck))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Deck.findById(req.params.id)
      .then(dbDeck => res.json(dbDeck))
      .catch(err => res.status(422).json(err));
  },
  saveDeck: function(req, res) { 
    console.log("DeckControllers saveDeck(dbDeck.save() working.js")
    db.Deck.create(req.body)
      .then(dbDeck => dbDeck.save())
      .then(dbDeck => res.json(dbDeck))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Deck.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbDeck => res.json(dbDeck))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Deck.findById(req.params.id)
      .then(dbDeck => dbDeck.remove())
      .then(dbDeck => res.json(dbDeck))
      .catch(err => res.status(422).json(err));
  }
};
