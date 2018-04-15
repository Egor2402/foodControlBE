const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  ndb_no: String,
  short_desc: String,
  water: Number,
  energ_kcal: Number,
  protein: Number,
  lipid: Number,
  carbohydrates: Number
});

module.exports = mongoose.model('Food', foodSchema);
