const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// core imports
const Model = require('../models/Archives/assistance/assistance');
const newDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');
const clientSideTableData = require('../utils/tableSchema');

/* GET one in preparation for edit */
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
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({}, clientSideTableData.assistance.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* POST new document to DB */
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

/* PATCH existing document */
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
        res.status(500).json({message: 'Error in PATCH assistance route'});
      }
    }
  });
});

/* DELETE existing document */
router.delete('/:id', async (req, res) => {
  /* No authentication is included because delete route does not
  send back a response body so no way to check using jwt. in this
  case authentication is left to the frontend
  */
  try {
    await Model.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
});

module.exports = router;
