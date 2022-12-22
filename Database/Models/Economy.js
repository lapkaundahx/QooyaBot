const { Schema, model } = require('mongoose');

const Economy = new Schema({
  Guild: String,
  User: String,
  Money: Number,
  Bank: Number,
  Reward: String 
});

module.exports = model("economy", Economy);