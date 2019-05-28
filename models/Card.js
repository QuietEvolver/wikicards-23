const mongoose = require("mongoose"); //guilds a schema for the database for the app.  mongoosedb 
const Schema = mongoose.Schema; //sets a schema for mongoeese.db

const cardSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  //abstract: { type: [String], required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  abstract: { type: String, required: true },
  confidence: { type: Schema.Types.Decimal128 , required: true },
  uri: { type: String, required: true }

  //dandelionId: { type: String, required: true, unique: true }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
/*{ "title" :  {"$type": String, "$required": true,
 "image" : "$type": String, "$required": true,
 "abstract" :  "$type": String, "$required": true }*/ 