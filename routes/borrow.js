const express = require('express');
const router = express.Router();

// Model
const Borrow = require('../models/Archives/assistance/borrow');

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
    let result = await Borrow.find();
    // let numOfDocs = await Assistance.find().countDocument();
    // console.log(numOfDocs);
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET Borrow route'});
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
