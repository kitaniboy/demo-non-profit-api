const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const OrphanSponsors = require('../../models/orphans/orphanSponsors');
const newDocument = require('../../utils/createNewDoc');
// const verifyToken = require('../middleware/verifyToken');

let TableData = [
  'sponsorName',
  'sponsorId',
  'sponsorPhone',
  'numberOfSponsored',
  'sponsorAmount',
  'paymentMethod',
  'sponsorStatus',
  'sponsorBankAccountNum',
  'sponsorBank',
];

/* GET route */
router.get('/:id', async (req, res) => {
  try {
    let result = await OrphanSponsors.findOne({'_id': req.params['id']});
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
    let result = await OrphanSponsors.find({}, TableData.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    // console.log(err);
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});


router.get('/:sponsorId', async (req, res) => {
  try {
    let result = await OrphanSponsors.find({'sponsorId': req.params['sponsorId']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET orphanSponsor route'});
  }
  // OrphanSponsors.findOne({'sponsorId': req.params['sponsorId']}, ((err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       message: 'failed to get family data',
  //       error: err
  //     });
  //   } else {
  //     res.status(200).json({data: result});
  //   }
  // }));
});

/* POST route */
router.post('/', async (req, res) => {
  let orphanSponsor = new OrphanSponsors(newDocument(OrphanSponsors.schema.obj, req.body));
  try {
    await orphanSponsor.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST orphanSponsor route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let orphanSponsor = new OrphanSponsors(newDocument(OrphanSponsors.schema.obj, req.body));
  // orphanSponsor.save(err => {
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
    await OrphanSponsors.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH orphanSponsor route'});
  }
  // OrphanSponsors.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
    await OrphanSponsors.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE OrphanSponsors route'});
  }
  // OrphanSponsors.findByIdAndDelete({'_id': req.params.id}, err => {
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
