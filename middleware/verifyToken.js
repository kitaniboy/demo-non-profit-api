const jwt = require('jsonwebtoken');
const Model = require('../models/users');
const mongoose = require('mongoose');

// middleware

const verifyToken = async (req, res, next) => {
  // Get Auth Header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    const decodedToken = jwt.decode(bearerToken);
    const userId = new mongoose.Types.ObjectId(decodedToken?.user[0]?._id);
    const currentUser = await Model.findOne({"_id": userId});

    if (currentUser.readOnly && req.method !== 'GET') {
      res.status(400).json({message: 'Bad Request; The current user has read-only access'});
    } else {
      // next middleware
      next();
    }
  } else {
    // Forbiddend
    res.status(403).json({message: 'Forbiden'});
  }
};

module.exports = verifyToken;