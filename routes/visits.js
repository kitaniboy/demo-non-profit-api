const express = require('express');
const router = express.Router();

const Visits = require('../models/visit');

/* GET route */
router.get('/', function(req, res, next) {
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
router.post('/', function(req, res, next) {
  let visit = new Visits({
    familyID: req.query['familyID'],
    visitorName:  req.query['visitorName'],
    visitorPhone: req.query['visitorPhone'],
    address:   req.query['address'],
    purposeOfVisit: req.query['purposeOfVisit'], // case
    response:req.query['response'],
    caseAgent: req.query['caseAgent'], // who will handle it?
    caseCategory: req.query['caseCategory'],
    documentsMissing: req.query['documentsMissing'],
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
router.patch('/:id', function(req, res, next) {
  Visits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.query}, err => {
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
router.delete('/:id', function(req, res, next) {
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
