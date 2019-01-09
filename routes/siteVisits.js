const express = require('express');
const router = express.Router();

const SiteVisits = require('../models/siteVisit');

router.get('/', (req, res) => {
  SiteVisits.find((err, result) => {
    if (err) {
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

  let siteVisit = new SiteVisits({
    familyID: req.body['familyID'],
    detailedAddress: req.body['detailedAddress'],
    fieldAgentName: req.body['fieldAgentName'],
    fieldAgentPhone: req.body['fieldAgentPhone'],
    assistanceCategory: req.body['assistanceCategory'],
    activeCase: req.body['activeCase'],
    DateOfVisit: req.body['DateOfVisit'],
    AgentReport: req.body['AgentReport'],
    AgentSuggestion: req.body['AgentSuggestion'],
    caseMovedTo: req.body['caseMovedTo']
  });
  siteVisit.save(err => {
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
  // });
});

/* PATCH route */
router.patch('/:id', function(req, res) {
  SiteVisits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
  SiteVisits.findByIdAndDelete({'_id': req.params.id}, err => {
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
