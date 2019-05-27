const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log("cardControllers are working.js")
    db.Card.find(req.query)
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Card.findById(req.params.id)
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  },
  saveCard: function(req, res) { 
    console.log("cardControllers saveCard(dbCard.save() working.js")
    const { card, deckId } = req.body;
    db.Card.create( card )
      .then(dbCard => dbCard.save())
      .then(dbCard => { 
        console.log("dbCard", dbCard)
      return db.Deck.findOneAndUpdate({}, { $push: { card: dbCard._id } }, { new: true })        
      }) 
      .then(() => {res.json({ message: "Card Sent"})}) 
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Card.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Card.findById(req.params.id)
      .then(dbCard => dbCard.remove())
      .then(dbCard => res.json(dbCard))
      .catch(err => res.status(422).json(err));
  }
};
