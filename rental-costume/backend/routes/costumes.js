const express = require('express');
const router = express.Router();
const Costume = require('../models/costume');
const auth = require('../middleware/auth');

// get all costumes (public)
router.get('/', async (req, res) => {
  const items = await Costume.find();
  res.json(items);
});

// get one
router.get('/:id', async (req, res) => {
  const item = await Costume.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  res.json(item);
});

// create (admin only) -- for demo, protected route; in frontend you can simulate admin token
router.post('/', auth, async (req, res) => {
  // optional: check req.user.role === 'admin'
  const data = req.body;
  const c = new Costume(data);
  await c.save();
  res.json(c);
});

// update, delete similar...
module.exports = router;
