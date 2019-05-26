const mongoose = require("mongoose"); //guilds a schema for the database for the app.  mongoosedb 
const Schema = mongoose.Schema; //sets a schema for mongoeese.db
//schema set for the book info delineation of indexes w/in  mongoose database
const bookSchema = new Schema({ //set to the intake info from API call our server has set proprietary parameters to in order to have the mirrored in our app and in our system for fluid reference access
  title: { type: String, required: true },
  subtitle: { type: String },
  authors: { type: [String], required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  googleId: { type: String, required: true, unique: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
