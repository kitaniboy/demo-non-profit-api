const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const Orphans = require('../../models/orphans/orphans');
const newDocument = require('../../utils/createNewDoc');
// const verifyToken = require('../middleware/verifyToken');

let TableData = [
  'orphanId',
  'familyId',
  'sponsorId',
  'orphanName',
  'sponsorAmount',
  'sponsorshipStatus',
  '_id'
];

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await Orphans.findOne({'_id': req.params['id']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Orphans.find({}, TableData.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let orphan = new Orphans(newDocument(Orphans.schema.obj, req.body));
  try {
    await orphan.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST orphans route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let orphan = new Orphans(newDocument(Orphans.schema.obj, req.body));
  // orphan.save(err => {
  //   if (err) {
  //     // console.log(err);
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 38:30',
  //       error: err
  //     });
  //   } else {
  //     return res.status(201).json({
  //       message: 'New Visit data created!'
  //     });
  //   }
  // });
  // });
});

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Orphans.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH orphans route'});
  }
  // Orphans.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 55:33'
  //     });
  //   } else {
  //     res.json({
  //       message: 'updatad'
  //     });
  //   }
  // });
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Orphans.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE orphans route'});
  }
  // Orphans.findByIdAndDelete({'_id': req.params.id}, err => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 55:33'
  //     });
  //   } else {
  //     res.json({
  //       message: 'deleted'
  //     });
  //   }
  // });
});

module.exports = router;
