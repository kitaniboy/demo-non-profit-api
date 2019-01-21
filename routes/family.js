const express = require('express');
const router = express.Router();

const Family = require('../models/family/family');

let childList = [
  'accommodationStatus',
  'familyAddress',
  'familyCategory',
  'guardian',
  'homeDetails',
  'husband',
  'income',
  'livingCondition',
  'loan',
  'possessions',
  'relative',
  'wife'
];

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

router.get('/', (req, res) => {
  Family.find((err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'siteVisit.js'
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

  let family = new Family(newDocument(Family.schema.obj, req.body));
  for (let i =0; i < childList.length; i++ ){
    family[childList[i]].push(req.body);
  }
  family.save(err => {
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
  Family.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
  Family.findByIdAndDelete({'_id': req.params.id}, err => {
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
