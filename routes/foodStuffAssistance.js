const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Model = require('../models/Archives/assistance/foodStuffAssistance');
const newDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');

let TableData = [
  'familyId',
  'assistanceId',
  'shoppingCenter',
  'startDate',
  'nameOfRecipient',
  'phoneOfRecipient',
  '_id'
];

/* GET route */
router.get('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.findOne({'_id': req.params['id']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        // console.log(err);
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* GET route */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({}, TableData.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        // console.log(err);
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* POST route */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let model = new Model(newDocument(Model.schema.obj, req.body));
      try {
        await model.save();
        return res.status(201).json({message: 'new data created!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in POST assistance route'});
      }
    }
  });
});

/* PATCH route */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        await Model.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing data updated!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in PATCH FoodStuffAssistance route'});
      }
    }
  });
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  // await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  try {
    await Model.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
  //   }
  // });
});



module.exports = router;
