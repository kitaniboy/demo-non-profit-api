const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/user');

/* register new user should only be done by admin */
router.post('/register', (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);

  let user = new User({
    username : req.body.username,
    password : hashedPassword,
    role: req.body.role || 0
  });
  // save new user
  user.save(err => {
    if (err) return res.status(500).json({message: 'There was a problem registering the user.'});

    return res.status(200).json({ auth: true, message: 'New user registered' });
  });
});

router.get('/login', (req, res) => {
  let returnUser = {
    username: req.body.username,
    password: req.body.password
  };
  User.find({username: req.body.username}, (err, user) => {
    if (err) return res.status(500).send('could not find user');

    bcrypt.compareSync(req.body.password, user.password, (err) => {
      if (err) return res.status(500).send('wrong password');

      // create a token
      jwt.sign({returnUser}, process.env.SECRET, (err, token) => {
        res.status(200).json({
          auth: true,
          token
        });
      });
    });
  });
});

module.exports = router;
