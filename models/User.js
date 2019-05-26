var mongoose = require("mongoose");
var Schema = mongoose.Schema;// Save a reference to the Schema constructor

var userSchema = new Schema({
 //* NOTE: the MongoDB _id was created automatically.; //TOBE additions w/in[ -u/-p match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true}
  username: { type: String, trim: true, required: "Username is Required"},
  // `password` is required and of type String
  password: { type: String, trim: true, required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6 < 15;
      },
      "Password should be longer."
    ]},
    createdAt: {
      type: Date,
      default: Date.now
    },
    deck: [{ // `deck`:object stores Deck id; "ref"property links  ObjectId to Deck model & populates the User with an associated Deck
        type: Schema.Types.ObjectId, 
        ref: "Deck", 
        unique: true 
      }]//,
      // complete: {
      //   type: DataTypes.BOOLEAN,// defaultValue is a flag that defaults to false if it isn't supplied one
      //   defaultValue: false
      });

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", userSchema);
// Export the User model
module.exports = User;

