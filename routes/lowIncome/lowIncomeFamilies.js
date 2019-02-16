const express = require('express');
const router = express.Router();

// Model
const LowIncomeFamilies = require('../../models/lowIncome/lowIncomeFamilies');
const newDocument = require('../../utils/createNewDoc');

let TableData = [
  'isActive',
  'notes',
  'shoppingCenterName',
  'address.area',
  'endDate',
  'wifeName',
  'husbandName',
  'familyId'
];

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await LowIncomeFamilies.findOne({'_id': req.params['id']});
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
    let result = await LowIncomeFamilies.find({}, TableData.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let lowIncomeFamilies = new LowIncomeFamilies(newDocument(LowIncomeFamilies.schema.obj, req.body));
  try {
    await lowIncomeFamilies.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST LowIncomeFamilies route'});
  }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await LowIncomeFamilies.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH LowIncomeFamilies route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await LowIncomeFamilies.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE LowIncomeFamilies route'});
  }
});

module.exports = router;
