const express = require('express');
const router = express.Router();

// Model
const LowIncomePayments = require('../../models/lowIncome/lowIncomePayments');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await LowIncomePayments.find();
    // let numOfDocs = await Assistance.find().countDocument();
    // console.log(numOfDocs);
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET LowIncomePayments route'});
  }
});

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await LowIncomePayments.find();
    // let numOfDocs = await Assistance.find().countDocument();
    // console.log(numOfDocs);
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET LowIncomePayments route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
    let lowIncomePayments = new LowIncomePayments(newDocument(LowIncomePayments.schema.obj, req.body));
    try {
      await lowIncomePayments.save();
      return res.status(201).json({message: 'new data created!'});
    }
    catch(err) {
      res.status(500).json({message: 'Error in POST LowIncomePayments route'});
    }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await LowIncomePayments.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH LowIncomePayments route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await LowIncomePayments.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE LowIncomePayments route'});
  }
});

module.exports = router;
