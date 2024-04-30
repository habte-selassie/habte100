// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the request contains a token in the headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Attach the user object to the request for further use
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = authMiddleware;
