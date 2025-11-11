const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: { type: String },
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
});

module.exports = mongoose.model('Product', productSchema);
