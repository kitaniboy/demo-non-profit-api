const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const OrphanFamily = require('../../models/orphans/orphanFamily');
const newDocument = require('../../utils/createNewDoc');
const verifyToken = require('../../middleware/verifyToken');

router.get('/:familyId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await OrphanFamily.find({'familyId': req.params['familyId']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await OrphanFamily.find();
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET orphanFamily route'});
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
      let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
      try {
        await orphanFamily.save();
        return res.status(201).json({message: 'new data created!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in POST orphanFamily route'});
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
        await OrphanFamily.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing data updated!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in PATCH orphanFamily route'});
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
    await OrphanFamily.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE orphanFamily route'});
  }
  //   }
  // });
});

module.exports = router;
