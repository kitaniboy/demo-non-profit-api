const express = require('express');
const router = express.Router();

// Model
const Assistance = require('../models/Archives/assistance/assistance');
const newDocument = require('../utils/createNewDoc');

let TableData = [
  'cost',
  'familyId',
  'supportNeeded.date',
  'supportNeeded.description',
  'assistanceCategory',
  'assistanceId',
  'familyId',
  '_id'
];

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await Assistance.findOne({'_id': req.params['id']});
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
    let result = await Assistance.find({}, TableData.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let assistance = new Assistance(newDocument(Assistance.schema.obj, req.body));
  try {
    await assistance.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST assistance route'});
  }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Assistance.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH assistance route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Assistance.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
});

module.exports = router;
