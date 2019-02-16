const express = require('express');
const router = express.Router();

const Model = require('../models/Archives/homeVisits/visitReports');
const newDocument = require('../utils/createNewDoc');

router.get('/:familyId', async (req, res) => {
  try {
    // console.log(req.params.familyId);
    let result = await Model.findOne({'familyId':req.params.familyId});
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET visitReport route'});
  }
});


/* POST route */
router.post('/', async (req, res) => {
  let model = new Model(newDocument(Model.schema.obj, req.body));
  try {
    await model.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST visitReport route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let visitReport = new VisitReports(newDocument(VisitReports.schema.obj, req.body));
  // visitReport.save(err => {
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
    await Model.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH visitReport route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Model.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE visitReport route'});
  }
  // VisitReports.findByIdAndDelete({'_id': req.params.id}, err => {
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
