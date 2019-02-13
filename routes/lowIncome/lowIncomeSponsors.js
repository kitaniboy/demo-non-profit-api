const express = require('express');
const router = express.Router();

// Model
const LowIncomeSponsors = require('../../models/lowIncome/lowIncomeSponsors');
const newDocument = require('../../utils/createNewDoc');

// const newDocument = (model, body) => {
//   let obj ={};
//   for (let i in model) {
//     obj[i] = body[i];
//   }
//   return obj;
// };

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await LowIncomeSponsors.find();
    return res.status(200).json({ data: result });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error in GET LowIncomeSponsors route' });
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let lowIncomeSponsors = new LowIncomeSponsors(newDocument(LowIncomeSponsors.schema.obj, req.body));
  try {
    await lowIncomeSponsors.save();
    return res.status(201).json({ message: 'new data created!' });
  }
  catch (err) {
    res.status(500).json({ message: 'Error in POST LowIncomeSponsors route' });
  }
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await LowIncomeSponsors.findByIdAndUpdate({ '_id': req.params.id }, { $set: req.body });
    return res.status(200).json({ message: 'existing data updated!' });
  }
  catch (err) {
    res.status(500).json({ message: 'Error in PATCH LowIncomeSponsors route' });
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await LowIncomeSponsors.findByIdAndDelete({ '_id': req.params.id });
    return res.status(200).json({ message: 'existing data deleted!' });
  }
  catch (err) {
    res.status(500).json({ message: 'Error in DELETE LowIncomeSponsors route' });
  }
});

module.exports = router;
