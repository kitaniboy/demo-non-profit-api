const express = require('express');
const router = express.Router();

const HomeVisits = require('../models/homeVisits/homeVisits');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
    // console.log(i);
  }
  return obj;
};

router.get('/', async (req, res) => {
  try {
    let result = await HomeVisits.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET HomeVisits route'});
  }
  // HomeVisits.find((err, result) => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'siteVisit.js'
  //     });
  //   } else {
  //     res.status(200).json({data: result});
  //   }
  // });
});


/* POST route */
router.post('/', async (req, res) => {
  let homeVisit = new HomeVisits(newDocument(HomeVisits.schema.obj, req.body));
  try {
    await homeVisit.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST homeVisit route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let homeVisit = new HomeVisits(newDocument(HomeVisits.schema.obj, req.body));
  // homeVisit.save(err => {
  //   if (err) {
  //     // console.log(err);
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js',
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
    await HomeVisits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH assistance route'});
  }
  // HomeVisits.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
  //   if (err) {
  //     // console.log(err);
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
    await HomeVisits.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
  // HomeVisits.findByIdAndDelete({'_id': req.params.id}, err => {
  //   // console.log(err);
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

// {
//   visitNumber: req.body['visitNumber'],
//   familyId: req.body['familyId'],
//   familyName: req.body['familyName'],
//   dateOfVisit: req.body['dateOfVisit'], // default on frontEnd
//   timeOfVisit: req.body['timeOfVisit'], // default on frontEnd
//   address: req.body['address'],
//   teamName: req.body['teamName'],
//   teamComments: req.body['teamComments'],
//   dateOfLetter: req.body['dateOfLetter'] // default on frontEnd
// }