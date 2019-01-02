const express = require('express');
const router = express.Router();

const Visits = require('../models/visit');

/* GET route */
router.get('/', function(req, res) {
  Visits.find((err, result) => {
    if (err) {
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js, 12:28'
      });
      // console.log(err);
    } else {
      res.status(200).json({data: result});
    }
  });
});

/* POST route */
router.post('/', function(req, res) {
  let visit = new Visits({
    familyID: req.body['familyID'],
    visitorName:  req.body['visitorName'],
    visitorPhone: req.body['visitorPhone'],
    address:   req.body['address'],
    purposeOfVisit: req.body['purposeOfVisit'], // case
    response:req.body['response'],
    caseAgent: req.body['caseAgent'], // who will handle it?
    caseCategory: req.body['caseCategory'],
    documentsMissing: req.body['documentsMissing'],
  });
  visit.save(err => {
    if (err) {
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js, 38:30'
      });
    } else {
      return res.status(201).json({
        message: 'New Visit data created!'
      });
    }
  });

});

/* PATCH route */
router.patch('/:id', function(req, res) {
  Visits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
    if (err) {
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
  Visits.findByIdAndDelete({'_id': req.params.id}, err => {
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
