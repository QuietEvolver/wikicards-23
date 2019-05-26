const path = require("path"); //npm path fucntionality for accessable navigation w/in file paths 
const router = require("express").Router(); // declared const router var as express app object on App.Router fxn call to get all after hitting the route to get it
const cardRoutes = require("./card"); //constant variables defined for .files paths for routing w/in same api folder  for line 3-4
const dandelionRoutes = require("./dandelion");//this is a module for the api call from google here
const userRoutes = require("./user");

router.use("/dandelion", dandelionRoutes); //.files paths for root routing w/in same api folder  for line 3-4
console.log("All Routes: inner index.", dandelionRoutes, cardRoutes, userRoutes );
router.use("/card", cardRoutes); 

router.use("/user", userRoutes);

module.exports = router; //exports the router for modular App accessability

