const express = require('express');
const router = express.Router();

const HomeVisits = require('../models/homeVisits/visits');

router.get('/', (req, res) => {
  HomeVisits.find((err, result) => {
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

  let homeVisit = new HomeVisits({
    visitNumber: req.body['visitNumber'],
    familyId: req.body['familyId'],
    familyName: req.body['familyName'],
    dateOfVisit: req.body['dateOfVisit'], // default on frontEnd
    timeOfVisit: req.body['timeOfVisit'], // default on frontEnd
    address: req.body['address'],
    teamName: req.body['teamName'],
    teamComments: req.body['teamComments'],
    dateOfLetter: req.body['dateOfLetter'] // default on frontEnd
  });
  homeVisit.save(err => {
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
  HomeVisits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
  HomeVisits.findByIdAndDelete({'_id': req.params.id}, err => {
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
