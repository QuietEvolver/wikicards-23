const path = require("path");  //npm path fucntionality for accessable navigation w/in file paths 
const router = require("express").Router(); // declared const router var as express app object on App.Router fxn call to get all after hitting the route to get it
const apiRoutes = require("./api");

router.use("/api", apiRoutes); //hits the routes /api alonside the imported apiRoutes fxns for ./api

router.use((req, res) => //router file to build clientside in development and production
  res.sendFile(path.join(__dirname, "../client/build/index.html")) //the set (private(clientSide)) directory name aka _dirname, is 
  //built and populated as said path joining the files with the client/build/index.html(temp)
);

module.exports = router; //exporting router api.path funcntions declared 
