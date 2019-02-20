const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Model = require('../../models/lowIncome/lowIncomePayments');
const newDocument = require('../../utils/createNewDoc');
const verifyToken = require('../../middleware/verifyToken');

/* GET route */
router.get('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({'sponsorId': req.params.id});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET LowIncomePayments route'});
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
        let result = await Model.find();
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET LowIncomePayments route'});
      }
    }
  });
});

/* GET route */
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.findOne({'_id': req.params.id});
        // let numOfDocs = await Assistance.find().countDocument();
        // console.log(numOfDocs);
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET LowIncomePayments route'});
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
        res.status(500).json({message: 'Error in POST LowIncomePayments route'});
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
        res.status(500).json({message: 'Error in PATCH LowIncomePayments route'});
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
    res.status(500).json({message: 'Error in DELETE LowIncomePayments route'});
  }
  //   }
  // });
});

module.exports = router;
