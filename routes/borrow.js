const express = require('express');
const router = express.Router();

// Model
const Borrow = require('../models/Archives/assistance/borrow');
const newDocument = require('../utils/createNewDoc');

let TableData = [
  'formId',
  'familyId',
  'familyName',
  'recipientName',
  'department',
  'nameOfEmployee',
  'dateOfBorrow',
  'dateOfReturn',
  '_id'
];

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await Borrow.findOne({'_id': req.params['id']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Borrow.find({}, TableData.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let borrow = new Borrow(newDocument(Borrow.schema.obj, req.body));
  try {
    await borrow.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST Borrow route'});
  }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Borrow.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH Borrow route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Borrow.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE Borrow route'});
  }
});

module.exports = router;
