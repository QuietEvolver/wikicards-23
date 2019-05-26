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
    db.Card.create(req.body)
      .then(dbCard => dbCard.save())
      .then(dbCard => res.json(dbCard))
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
