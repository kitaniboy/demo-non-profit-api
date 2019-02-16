const express = require('express');
const router = express.Router();

const OrphanFamily = require('../../models/orphans/orphanFamily');
const newDocument = require('../../utils/createNewDoc');

router.get('/:familyId', async (req, res) => {
  try {
    let result = await OrphanFamily.find({'familyId': req.params['familyId']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

router.get('/', async (req, res) => {
  try {
    let result = await OrphanFamily.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET orphanFamily route'});
  }
});

/* POST route */
router.post('/', async (req, res) => {
  let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
  try {
    await orphanFamily.save();
    return res.status(201).json({message: 'new data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in POST orphanFamily route'});
  }
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
  // orphanFamily.save(err => {
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
    await OrphanFamily.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH orphanFamily route'});
  }
  //   OrphanFamily.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
    await OrphanFamily.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE orphanFamily route'});
  }
  //   OrphanFamily.findByIdAndDelete({'_id': req.params.id}, err => {
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
