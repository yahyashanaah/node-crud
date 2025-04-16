const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model('Item', itemSchema);
