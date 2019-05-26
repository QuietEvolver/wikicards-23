const router = require("express").Router();
const deckController = require("../../controllers/deckController");

router.route("/")
  .get(deckController.findAll)
  .post(deckController.saveDeck);

router
  .route("/:id")
  .get(deckController.findById)
  .put(deckController.update)
  .delete(deckController.remove);

module.exports = router;
