const express = require('express');
const router = express.Router();

// Model
const Users = require('../models/users');
const newDocument = require('../utils/createNewDoc');

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Users.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET Users route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let users = new Users(newDocument(Users.schema.obj, req.body));
  try {
    await users.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST Users route'});
  }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Users.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH Users route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Users.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE Users route'});
  }
});

module.exports = router;
