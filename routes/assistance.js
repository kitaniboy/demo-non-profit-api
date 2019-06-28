const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// core imports
const Model = require('../models/Archives/assistance/assistance');
const createNewDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');
const clientSideTableData = require('../utils/tableSchema');

/* GET one in preparation for edit */
router.get('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.findOne({'_id': req.params['id']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({}, clientSideTableData.assistance.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* POST new document to DB */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      let model = new Model(createNewDocument(Model.schema.obj, req.body));
      try {
        await model.save();
        return res.status(201).json({message: 'new document created!'});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* PATCH existing document */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        await Model.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing document updated!'});
      }
      catch(err) {
        res.status(500).json({message: err});
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
    return res.status(200).json({message: 'existing document deleted!'});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;
