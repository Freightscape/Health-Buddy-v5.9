/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make day schema
// const mongoose = require("mongoose");

//schema
const daySchema = new Schema({
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  foodEntries: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  username: String,
});

const Day = model("Day", daySchema);
///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Day;
