const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ msg: 'No token' });
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
