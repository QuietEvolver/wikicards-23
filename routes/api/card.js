const router = require("express").Router(); //express app router initiated as a constant with variable router
const cardController = require("../../controllers/cardController"); //constante imports in the instanceController fxns 

router.route("/") //whenever the routes hit the '/', it performs the follwoing crud functions housed withing the controllers upon route being hit
  .get((req,res) => {
      console.log("card.js Route.get");
      res.send("This is the card.jsresponse back to client");
  })
  //.get(cardController.findAll)
  .post(cardController.saveCard);

// router
//   .route("/:id")//same as above except more specifically CRUDops performed by unique identifier :id
//   .get(cardController.findById)
//   .put(cardController.update)
//   .delete(cardController.remove);

module.exports = router; //module router exported for modular fxn accessability
