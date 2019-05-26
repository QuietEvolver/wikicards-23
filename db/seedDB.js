const mongoose = require("mongoose");
const db = require("../models");
// !!!!!!!!!!!!!!!!!

// ----- BE AWARE -----

// **********This file ******EMPTIES***** 

// the cards collection !!!!!!!!!!!


// and inserts the test cards below
// mongoose.connect(
//   process.env.MONGODB_URI ||// LIVE:  
// "mongodb:heroku_d3hm1rrg:q5m01fivkfl91ohm80kalcer7u@ds149146.mlab.com:49146/heroku_d3hm1rrg"
// // WC - TEST:mongodb://heroku_rb0826st:8tobtgl5bcurju6dh1g7uf9d22@ds149616.mlab.com:49616/heroku_rb0826st
//  // "mongodb:heroku_rb0826st:8tobtgl5bcurju6dh1g7uf9d22@ds149616.mlab.com:49616/heroku_rb0826st"
//   );
//Connect to local db
mongoose.connect("mongodb://localhost/wikicards", {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
console.log("Mongo.db ", db);
const cardSeed = [
  {
    title: "The Dead Zone",
    image: "Stephen King",
    abstract:
      "A number-one national best seller about a man who wakes up from a five-year coma able to see people's futures and the terrible fate awaiting mankind in The Dead Zone - a \"compulsive page-turner\" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people's futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a \"faultlessly paced...continuously engrossing\" (Los Angeles Times) novel of second sight.",
    date: new Date(Date.now())
  },
  {
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    image: "Ashlee Vance",
    abstract:
      "In the spirit of Steve Jobs and Moneyball, Elon Musk is both an illuminating look at the extraordinary life of one of Silicon Valley's most exciting, unpredictable, and ambitious entrepreneurs - a real-life Tony Stark - and a fascinating exploration of the renewal of American invention and its new makers. Elon Musk spotlights the technology and vision of Elon Musk, the renowned entrepreneur and innovator behind SpaceX, Tesla, and SolarCity, who sold one of his Internet companies, PayPal, for $1.5 billion. Ashlee Vance captures the full spectacle and arc of the genius' life and work, from his tumultuous upbringing in South Africa and flight to the United States to his dramatic technical innovations and entrepreneurial pursuits. Vance uses Musk's story to explore one of the pressing questions of our age: Can the nation of inventors and creators who led the modern world for a century still compete in an age of fierce global competition? He argues that Musk - one of the most unusual and striking figures in American business history - is a contemporary, visionary amalgam of legendary inventors and industrialists, including Thomas Edison, Henry Ford, Howard Hughes,and Steve Jobs. More than any other entrepreneur today, Musk has dedicated his energies and his own vast fortune to inventing a future that is as rich and far reaching as the visionaries of the golden age of science-fiction fantasy.",
    date: new Date(Date.now())
  },
  {
    title: "Astrophysics for People in a Hurry",
    image: "Neil deGrasse Tyson",
    abstract:
      "What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There's no better guide through these mind-expanding questions than acclaimed astrophysicist and best-selling author Neil deGrasse Tyson. But today, few of us have time to contemplate the cosmos. So Tyson brings the universe down to Earth succinctly and clearly, with sparkling wit, in digestible chapters consumable anytime and anywhere in your busy day. While waiting for your morning coffee to brew, or while waiting for the bus, the train, or the plane to arrive, Astrophysics for People in a Hurry will reveal just what you need to be fluent and ready for the next cosmic headlines: from the big bang to black holes, from quarks to quantum mechanics, and from the search for planets to the search for life in the universe.",
    date: new Date(Date.now())
  }
];
db.Card
  .deleteMany({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " roles inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
