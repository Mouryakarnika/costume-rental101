const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Costume = require('../models/costume');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { costumeId, size, startDate, endDate } = req.body;
    const costume = await Costume.findById(costumeId);
    if (!costume) return res.status(404).json({ msg: 'Costume not found' });

    // very basic availability check (quantity)
    if (costume.quantityAvailable <= 0) {
      return res.status(400).json({ msg: 'Not available' });
    }

    // price calc: days * pricePerDay
    const s = new Date(startDate);
    const e = new Date(endDate);
    const days = Math.ceil((e - s) / (1000*60*60*24)) + 1;
    const totalPrice = days * costume.pricePerDay;
    const depositPaid = costume.deposit || 0;

    const booking = new Booking({
      user: req.user._id,
      costume: costume._id,
      size,
      startDate: s,
      endDate: e,
      totalPrice,
      depositPaid,
      status: 'booked'
    });
    await booking.save();

    // decrease quantity (simple)
    costume.quantityAvailable -= 1;
    await costume.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// get user's bookings
router.get('/my', auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('costume');
  res.json(bookings);
});

module.exports = router;
