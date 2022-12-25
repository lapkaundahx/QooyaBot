const { Schema, model } = require('mongoose');

const Message = new Schema({
  Guild: String,
  User: String,
  Messages: Number
});

module.exports = model("messages", Message);