const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  costume: { type: mongoose.Schema.Types.ObjectId, ref: 'Costume' },
  size: String,
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  depositPaid: Number,
  status: { type: String, enum: ['booked','picked-up','returned','canceled'], default: 'booked' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
