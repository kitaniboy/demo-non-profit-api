const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/users');

/* register new user should only be done by admin */
router.post('/register', (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);

  let user = new User({
    username : req.body.username,
    password : hashedPassword,
    role: req.body.role
  });
  // save new user
  user.save(err => {
    if (err) return res.status(500).json({message: 'There was a problem registering the user.'});

    return res.status(200).json({ auth: true, message: 'New user registered' });
  });
});

router.get('/login', (req, res) => {
  let returnUser = {
    username: req.query.username,
    password: req.query.password
  };
  User.find({username: req.query.username}, (err, user) => {
    if (err) return res.status(500).send({message: 'could not find user'});
    // console.log(user[0]);

    bcrypt.compare(req.query.password, user[0].password, (err) => {
      if (err) return res.status(500).json({message: 'wrong password'});

      // create a token
      jwt.sign({returnUser}, process.env.SECRET, { expiresIn: '1hr'}, (err, token) => {
        if (err) return res.status(500).json({message: 'could not get token'})
        res.status(200).json({
          auth: true,
          token
        });
      });
    });
  });
});

module.exports = router;
