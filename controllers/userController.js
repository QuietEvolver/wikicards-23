const controller = require("../models");
var hostName = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "";


module.exports = {
findById: function(req, res) {
    controller.User.findById(req.params.id)
        .then(controllerUser => res.json(controllerUser))
        .catch(err => res.status(422).json({message: "ID already exists."}));
    },
    create: function(req, res) {
        console.log("req.body", req.body);
    controller.User.create(req.body)
        .then(controllerUser => {
            res.json({ message: "signed up. "});//redirect for environment testing locally(react is port:3000)
        })
        .catch(err => {res.status(442).json({message: "User/Password already exists."})});
    }
}; 

