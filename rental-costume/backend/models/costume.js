const mongoose = require('mongoose');

const CostumeSchema = new mongoose.Schema({
  title: String,
  category: String,
  sizes: [String],
  pricePerDay: Number,
  deposit: Number,
  description: String,
  images: [String],
  quantityAvailable: { type: Number, default: 1 },
  condition: { type: String, default: 'Good' }
}, { timestamps: true });

module.exports = mongoose.model('Costume', CostumeSchema);
