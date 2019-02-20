// middleware

const verifyToken = (req, res, next) => {
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
    // next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({message: 'Forbidden'});
  }
};

module.exports = verifyToken;