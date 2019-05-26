const controller = require("../models");

module.exports = {
findById: function(req, res) {
    controller.User.findById(req.params.id)
        .then(controllerUser => res.json(controllerUser))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
    controller.User.create(req.body)
        .then(controllerUser => res.json(controllerUser))
        .catch(err => res.status(422).json(err));
    }
}; 

