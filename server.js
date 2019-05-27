const express = require("express"); //
var logger = require("morgan");
var axios = require("axios");
let env = require("dotenv");
let API_KEY = process.env.REACT_APP_DANDELION_KEY;
API_KEY = env; //dandelion
let heroku_mongodb_connect = process.env.SVR_SIDE_HEROKU_MONGODB_CONNECT; 
heroku_mongodb_connect = env; //heroku mongodb cnxn
const cors = require("cors");
//var cheerio = require("cheerio");
const mongoose = require("mongoose"); //mongooser req'd for db
mongoose.set("useFindAndModify", false); //error from db says deprecation of fxn {(node:17900) DeprecationWarning: Mongoose: `findOneAndUpdate()`} must be set to F
const app = express();//Initialize Express
const PORT = process.env.PORT || 3001; //in production, if not, (process.env.xxx) place where our 2 applications render
const db = require("./models");// Require all models
const routes = require("./routes");//routing for mvc
//require("./routes")(app);
app.use(cors()); //middleware to allow for cross-origin request(s)
app.use(logger("dev"));//  middleware; Use morgan logger for logging requests
app.use(express.urlencoded({ extended: true })); //Configure middleware: send and receive json necessary to be parsed from plain http which javascript doens't understand the incoming data as an Object.
app.use(express.json());


if (process.env.NODE_ENV == "production") { 
   app.use(express.static("client/build"))//if we're in prdxn, point and use "clint/build", appending the build folder that will be build when Heroku npm react app is called modularized by webpack served to the ui triaged by heroku deployment
}

app.use(routes);

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   }
// );

const dandelion = require("node-dandelion");

 dandelion.configure({
  app_key:API_KEY,
  "app_id":"wikicards"
}); 
// brew services start mongo
// Service `mongodb` already started, use `brew services restart mongodb` to restart.
//  brew services restart mongodb
// ==> Successfully stopped `mongodb` (label: homebrew.mxcl.mongo
// ==> Successfully started `mongodb` (label: homebrew.mxcl.mongo

mongoose.connect( //connects to a remote WClive database named mongolab-adjacent-90810
  process.env.MONGODB_URI || "mongodb://localhost/wikicards",//"heroku_mongodb_connect",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
).then(
  client => { console.log("Database on.")}
);


app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);




// const express = require("express"); //
// var logger = require("morgan");
// var axios = require("axios");
// // var cheerio = require("cheerio");
// const mongoose = require("mongoose"); //mongooser req'd for db
// const routes = require("./routes");//routing for mvc
// const app = express();//Initialize Express
// const PORT = process.env.PORT || 3001; //in production, if not, (process.env.xxx) place where our 2 applications render
// const db = require("./models");// Require all models
// require("./routes")(app);
// app.use(logger("dev"));//  middleware; Use morgan logger for logging requests
// app.use(express.urlencoded({ extended: true })); //Configure middleware: send and receive json necessary to be parsed from plain http which javascript doens't understand the incoming data as an Object.
// app.use(express.json());
// const API_KEY = process.env.REACT_APP_DANDELION_KEY;
// const heroku_mongodb_connect = process.env.SVR_SIDE_HEROKU_MONGODB_CONNECT; 
// if (process.env.NODE_ENV == "production") { 
//    app.use(express.static("client/build"))//if we're in prdxn, point and use "clint/build", appending the build folder that will be build when Heroku npm react app is called modularized by webpack served to the ui triaged by heroku deployment
// }
// //local test server
// mongoose.connect("mongodb://localhost/wikicards", {
//       useCreateIndex: true,
//       useNewUrlParser: true
//     })

// //const dandelion = require("node-dandelion");

// //  dandelion.configure({
// //   app_key:API_KEY,
// //   "app_id":"wikicards"
// // }); 

// //app.use(routes);//route all uses inside

// // mongoose.connect( //connects to a remote WClive database named mongolab-adjacent-90810
// //   process.env.MONGODB_URI || heroku_mongodb_connect
// //   {
// //     useCreateIndex: true,
// //     useNewUrlParser: true
// //   }
// // );

// app.post("/signup", function(req, res) {
//   db.User.create(req.body)
//     .then(function(dbUser) {
//       res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//     })
//     .catch(function(err) {
//       res.json(err); // If an error occurred, send it to the client
//     });
// });

// app.post("/login", function(req, res) {
//   db.User.findOne({username: req.body.username})
//     .then(function(dbUser) {
//       res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//     })
//     .catch(function(err) {
//       res.json(err); // If an error occurred, send it to the client
//     });
// });

// // Route for saving/updating an User's associated Deck 
// // colon id === :id is a 'placeholder' for the uniqu identifier 'id' for the user.
// app.post("/deck/:id", function(req, res) {
//   // Create a new Deck and pass the req.body to the entry
//   db.Deck.create(req.body)
//     .then(function(dbDeck) {
//       // If a Deck was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Deck
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `card` array
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return db.User.findOneAndUpdate({}, { $push: { decks: dbDeck._id } }, { new: true })
//       .then(function(dbUser) {
//         res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//       })
//       .catch(function(err) {
//         res.json(err); // If an error occurred, send it to the client
//       });
//   });
// });

// // use express(app) to create a post route called "/card/:id"
// // :id -> placeholder that is going to take in a deckId
// app.post("/card/:id", function(req, res){
//   db.Card.create(req.body) 
//   .then(function(dbCard) {
//       return db.Deck.findOneAndUpdate({ _id: req.params.id }, { $push: { card: dbCard._id }}, { new: true });
//     }).then(function(dbCard) {
//           res.json(dbCard);// If we were able to successfully create Card, send it back to the client  
//     }).catch(function(err) {
//         res.json(err); // If an error occurred, send it to the client
//     });
//   });

// // //ABLE TO: return all: deck/user/card w/in their respective given id's as limitations
// // // Route for saving a new Note to the db and associating it with a User

// // // Route to get all User's and populate them with their Decks
// app.get("/usercards/:userId", function(req, res) {
//   // Find all users
//   db.User.findOne({ _id: req.params.userId })
//     // Specify that we want to populate the retrieved users with any associated card
//     .populate({
//       path: 'deck',
//       model: 'Deck',
//       populate: {
//         path: 'card',
//         model: 'Card'
//       }
//     })
//     .then(function(dbUser) {
//       // If able to successfully find and associate all Users and card, send them back to the client
//       // TODO: Send back json containing the user, deck, and card information
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// ///////////****************THIS IS ALL MAY09'19 LAST SERVER.JS ON HISTORY 5661369d7 */
// // Route for saving a new User's //w an associated Deck
// app.post("/users/:id", function(req, res) {
//   // Create a new Deck and pass the req.body to the entry
//   db.Deck.create(req.body)
//     .then(function(dbDeck) {
//       // If a Deck was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Deck
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.User.findOneAndUpdate({ _id: req.params.id },{ Deck: dbDeck._id }, { new: true });// 
//     })
//     .then(function(dbUser) {
//       res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//     })
//     .catch(function(err) {
//       res.json(err); // If an error occurred, send it to the client
//     });
// });
// // Route for saving/updating an User's associated User
// app.post("/users/:id", function(req, res) {
//   // Create a new User and pass the req.body to the entry
//   db.User.create(req.body)
//     .then(function(dbUser) {
//       // If a User was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new User
//       // { new: true } tells the query that we want it to return the created User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       // useCreateIndex
//       return db.User.create({ _id: req.params.id },{ User: dbUser._id }, { new: true });// 
//     })
//     .then(function(dbUser) {
//       res.json(dbUser);// If we were able to successfully update an User, send it back to the client
//     })
//     .catch(function(err) {
//       res.json(err); // If an error occurred, send it to the client
//     });
// });


// //card
// // Select just one user by an id's userName
// app.get("/find/:id", function(req, res) {
//   // When searching by an id, the id needs to be passed in
//   // as (mongojs.ObjectId(IdYouWantToFind))

//   // Find just one result in the notes collection
//   db.card.findOne( 
//     {
//       // Using the id in the url
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     function(error, found) {
//       // log any errors
//       if (error) {
//         console.log(error);
//         res.send(error);
//       }
//       else {
//         // Otherwise, send the note to the browser
//         // This will fire off the success function of the ajax request
//         console.log(found);
//         res.send(found);
//       }
//     }
//   );
// });
// });

// app.listen(PORT, () =>  //this is a listener that has been assigned a given port
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));//our local host lives here from our local server



// ///////////****************THIS IS LAST AL-SERVER.JS ON HISTORY 5661369d7 */
// // https://github.com/QuietEvolver/wikicards/commit/5661369d7c309112680ea25af9cb7a4365ce08c8#diff-78c12f5adc1848d13b1c6f07055d996e