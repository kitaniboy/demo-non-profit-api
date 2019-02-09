const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const FamilyMembers = require('../models/Archives/familyMembers');
// const verifyToken = require('../middleware/verifyToken');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

/* GET route */
// router.get('/:familyId', function(req, res) {
//   FamilyMembers.find({'familyId': req.params['familyId']}, (err, result) => {
//     if (err) {
//       res.status(500).json({
//         message: 'MongoDB error',
//         source: 'visit.js, 12:28'
//       });
//       // console.log(err);
//     } else {
//       res.status(200).json({data: result});
//     }
//   });
// });
/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await FamilyMembers.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET familyMembers route'});
  }
  // FamilyMembers.find((err, result) => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js, 12:28'
  //     });
  //     // console.log(err);
  //   } else {
  //     res.status(200).json({data: result});
  //   }
  // });
});

/* POST route */
router.post('/', async (req, res) => {
  let familyMember = new FamilyMembers(newDocument(FamilyMembers.schema.obj, req.body));
  try {
    await familyMember.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST familyMember route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

    // let familyMember = new FamilyMembers(newDocument(FamilyMembers.schema.obj, req.body));
    // familyMember.save(err => {
    //   if (err) {
    //     console.log(err);
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
    await FamilyMembers.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH familyMembers route'});
  }
  // FamilyMembers.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
    await FamilyMembers.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE familyMembers route'});
  }
  // FamilyMembers.findByIdAndDelete({'_id': req.params.id}, err => {
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
