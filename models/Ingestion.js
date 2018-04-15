const mongoose = require('mongoose');

const ingestionSchema = new mongoose.Schema({
  user_id: String,
  date_time: String,
  foods: [{
    ndb_no: String,
    short_desc: String,
    water: Number,
    energ_kcal: Number,
    protein: Number,
    lipid: Number,
    carbohydrates: Number,
    total_carbohydrates: Number,
    total_kcal: Number,
    total_lipid: Number,
    total_protein: Number,
    weight: Number
  }],
  total_kcal: {
    type: Number,
    set: v => v.toFixed(1)
  },
  total_protein: {
    type: Number,
    set: v => v.toFixed(1)
  },
  total_lipid: {
    type: Number,
    set: v => v.toFixed(1)
  },
  total_carbohydrates: {
    type: Number,
    set: v => v.toFixed(1)
  }
});

module.exports = mongoose.model('Ingestion', ingestionSchema);
