const express = require('express');
const router = express.Router();

const OrphanFamily = require('../models/orphans/orpahnFamily');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

router.get('/test', (req, res) => {
  // console.log(req.body);
  OrphanFamily.find({}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'MongoDB error'
      });
    } else {
      res.status(200).json({data: result});
    }
  });
});

router.get('/:familyId', (req, res) => {
  // console.log(req.body);
  OrphanFamily.find({'familyId': req.params['familyId']}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'MongoDB error'
      });
    } else {
      res.status(200).json({data: result});
    }
  });
});

router.get('/', (req, res) => {
  // console.log(req.body);
  OrphanFamily.find({}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'MongoDB error'
      });
    } else {
      res.status(200).json({data: result});
    }
  });
});

/* POST route */
router.post('/', function(req, res) {
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
  orphanFamily.save(err => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js',
        error: err
      });
    } else {
      return res.status(201).json({
        message: 'New Visit data created!'
      });
    }
  });
  // });
});

/* PATCH route */
router.patch('/:id', function(req, res) {
    OrphanFamily.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js, 55:33'
      });
    } else {
      res.json({
        message: 'updatad'
      });
    }
  });
});

/* DELETE route */
router.delete('/:id', function(req, res) {
    OrphanFamily.findByIdAndDelete({'_id': req.params.id}, err => {
    // console.log(err);
    if (err) {
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js, 55:33'
      });
    } else {
      res.json({
        message: 'deleted'
      });
    }
  });
});

module.exports = router;
