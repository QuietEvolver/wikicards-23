const router = require("express").Router(); //express app router initiated as a constant with variable router
//const userController = require("../../controllers/userController"); //constante imports in the instanceController fxns 

// router.route("/") //whenever the routes hit the '/', it performs the follwoing crud functions housed withing the controllers upon route being hit
//   .post(userController.create);  //makes a new user by posting to db

// router
//   .route("/:id")//same as above except more specifically CRUDops performed by unique identifier :id
//   .get(userController.findById) 
//   .put(userController.update) 

module.exports = router; //module router exported for modular fxn accessability

