const express = require('express');
const router = express.Router();

const Visits = require('../models/visit');

/* GET route */
router.get('/', function(req, res, next) {
  Visits.find((err, result) => {
    if (err) {
      res.json({message: err, source: 'visits.js'});
    } else {
      res.json({data: result});
    }
  })
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
  })
  visit.save();
  res.status(201).json({
    message: 'New Visit data created!'
  });
});

/* PATCH route */
router.patch('/:id', function(req, res, next) {
  Visits.findByIdAndUpdate({"_id": req.params.id}, {$set: req.query}, (err, visit) => {
    res.json({
      message: 'updatad'
    })

  })
});

/* DELETE route */
router.delete('/:id', function(req, res, next) {
  Visits.findByIdAndDelete({"_id": req.params.id}, (err, visit) => {
    res.json({
      message: 'deleted'
    })

  })
});

module.exports = router;