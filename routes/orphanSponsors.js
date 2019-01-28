const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const OrphanSponsors = require('../models/orphans/orphanSponsors');
// const verifyToken = require('../middleware/verifyToken');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
    // console.log(i);
  }
  return obj;
};

/* GET route */
router.get('/', function(req, res) {
  OrphanSponsors.find((err, result) => {
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
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

    let orphanSponsor = new OrphanSponsors(newDocument(OrphanSponsors.schema.obj, req.body));
    orphanSponsor.save(err => {
      if (err) {
        // console.log(err);
        res.status(500).json({
          message: 'MongoDB error',
          source: 'visit.js, 38:30',
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
  OrphanSponsors.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
  OrphanSponsors.findByIdAndDelete({'_id': req.params.id}, err => {
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
