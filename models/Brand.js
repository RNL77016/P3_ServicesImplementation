const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Brand', brandSchema);
