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
const foodsSchema = new Schema({
  food: String,
  calories: Number,
  protien: Number,
  fat: Number,
  carbs: Number,
  username: String,
});

// const dateSchema = new Schema({
//   day: Date,
// });

// make fruit model
const Food = model("Food", foodsSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Food;
