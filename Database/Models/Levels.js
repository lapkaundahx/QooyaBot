const { Schema, model } = require('mongoose');

const Levels = new Schema({
  Guild: { type: String },
  User: { type: String },
  Xp: { type: Number, default: 0 },
  Level: { type: Number, default: 0 },
});

module.exports = model("levels", Levels);