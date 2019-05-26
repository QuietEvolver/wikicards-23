const router = require("express").Router();//constant calls upon the Router import from express module
const dandelionController = require("../../controllers/dandelionController"); //this is a module for the api call from dandelion here
console.log("dandelionController", dandelionController);
//router express app object on App.Router fxn call to get all after hitting the route to get it
router
  .route("/")

    .get(dandelionController.create)

  module.exports = router; //exports the router for modular App accessability

