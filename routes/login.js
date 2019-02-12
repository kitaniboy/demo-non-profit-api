const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Users = require('../models/users');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

/* POST route */
router.post('/', async (req, res) => {
    Users.find({username: req.body.username}, async (err, user) => {
        if (!user.length) {
            return res.status(404).json({message: 'user not found'})
        }
        if (err) {
            return res.status(500).json({message: 'mongodb err'})
        } else {
            if (req.body.password === user[0].password) {
                try {
                    let token = await jwt.sign({user: user}, 'alrahmasecrestkey');
                    return res.status(200).json({token})
                }
                catch(err) {
                    console.log(err);
                    return res.status(500).json({message: 'failed to login'})
                }
            } else {
                res.status(404).json({message: 'wrong password!'})
            }
        }
    });
});

/* POST route */
router.post('/new', async (req, res) => {
        let user = new Users(newDocument(Users.schema.obj, req.body));
        try {
          await user.save();
          return res.status(201).json({message: 'new user created!'});
        }
        catch(err) {
            // console.log(err);
          res.status(500).json({message: 'Error in POST user route', err});
        }
  });

module.exports = router;
