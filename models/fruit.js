/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;
// upper line is combined of these 2 lines
// const Schema = mongoose.Schema
// const model = mogoose.model

// make fruis schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Fruit