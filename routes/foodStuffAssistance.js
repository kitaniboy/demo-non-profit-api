const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const FoodStuffAssistance = require('../models/assistance/foodStuffAssistance');
// const verifyToken = require('../middleware/verifyToken');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
    // console.log(i);
  }
  return obj;
};

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await FoodStuffAssistance.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET assistance route'});
  }
  // FoodStuffAssistance.find((err, result) => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 12:28'
  //     });
  //     // console.log(err);
  //   } else {
  //     res.status(200).json({data: result});
  //   }
  // });
});

/* POST route */
router.post('/', async (req, res) => {
  let foodStuffAssistance = new FoodStuffAssistance(newDocument(FoodStuffAssistance.schema.obj, req.body));
  try {
    await foodStuffAssistance.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST assistance route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

    // let foodStuffAssistance = new FoodStuffAssistance(newDocument(FoodStuffAssistance.schema.obj, req.body));
    // foodStuffAssistance.save(err => {
    //   if (err) {
    //     // console.log(err);
    //     res.status(500).json({
    //       message: 'MongoDB error',
    //       source: 'visit.js, 38:30',
    //       error: err
    //     });
    //   } else {
    //     return res.status(201).json({
    //       message: 'New Visit data created!'
    //     });
    //   }
    // });
  // });
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await FoodStuffAssistance.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH FoodStuffAssistance route'});
  }
  // FoodStuffAssistance.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 55:33'
  //     });
  //   } else {
  //     res.json({
  //       message: 'updatad'
  //     });
  //   }
  // });
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await FoodStuffAssistance.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
  // FoodStuffAssistance.findByIdAndDelete({'_id': req.params.id}, err => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 55:33'
  //     });
  //   } else {
  //     res.json({
  //       message: 'deleted'
  //     });
  //   }
  // });
});



module.exports = router;
