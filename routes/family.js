const express = require('express');
const router = express.Router();

// Models
const Family = require('../models/family/family');
const VisitReports = require('../models/homeVisits/visitReports');
const FamilyMembers = require('../models/familyMembers');
const OrphanFamily = require('../models/orphans/orphanFamily');

let childListReport = [
  'isArchived',
  'typeOfAssistanceNeeded',
  'dateOfCaseStudy',
  'claimMadeBy',
  'formId',
  'familyCategory',
  'wife',
  'husband',
  'familyId',
  '-_id'
];

let childListFamilyMembers = [
  'familyAddress',
  'typeOfAssistanceNeeded',
  'familyCategory',
  'husband',
  'wife',
  'income',
  'familyId',
  '-_id'
];

let childListOrphans = [
  'familyAddress',
  'husband',
  'familyCategory',
  'husband',
  'wife',
  'familyId',
  '-_id'
];

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Family.find();
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});

// get specific data points needed for visitReports
router.get('/report', async (req, res) => {
  try {
    let result = await Family.find({}, childListReport.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});
// router.get('/report', (req, res) => {
//   Family.find({}, childListReport.join(' '), ((err, result) => {
//     if (err) {
//       // console.log(err);
//       res.status(500).json({
//         message: 'MongoDB error',
//         source: 'siteVisit.js'
//       });
//     } else {
//       res.status(200).json({data: result});
//     }
//   }));
// });

// get specific data points needed for visitReports
router.get('/orphans', async (req, res) => {
  try {
    let result = await Family.find({'familyCategory.0.orphan': true}, childListOrphans.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});
// router.get('/orphans', (req, res) => {
//   Family.find({'familyCategory.0.orphan': true}, childListOrphans.join(' '), ((err, result) => {
//     if (err) {
//       // console.log(err);
//       res.status(500).json({
//         message: 'MongoDB error',
//         source: 'siteVisit.js'
//       });
//     } else {
//       res.status(200).json({data: result});
//     }
//   }));
// });

// get specific data points needed for familyMember
router.get('/:familyId', async (req, res) => {
  try {
    let result = await Family.find({'familyId': req.params['familyId']}, childListFamilyMembers.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});
// router.get('/:familyId', (req, res) => {
//   Family.findOne({'familyId': req.params['familyId']}, childListFamilyMembers.join(' '), ((err, result) => {
//     if (err) {
//       // console.log(err);
//       res.status(500).json({
//         message: 'failed to get family data',
//         error: err
//       });
//     } else {
//       res.status(200).json({data: result});
//     }
//   }));
// });


/* POST route */
router.post('/', async (req, res) => {
  let family = new Family(newDocument(Family.schema.obj, req.body));
  let visitReports = new VisitReports(newDocument(VisitReports.schema.obj, req.body));
  try {
    await family.save();
    await visitReports.save();
    if (req.body.familyCategory[0].orphan) {
      let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
      orphanFamily.save();
    }
    return res.status(201).json({message: 'New Visit data created!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  // let family = new Family(newDocument(Family.schema.obj, req.body));
  // let visitReports = new VisitReports(newDocument(VisitReports.schema.obj, req.body));
  // // let familyMembers = new FamilyMembers(newDocument(FamilyMembers.schema.obj, req.body));
  // console.log(req.body.familyCategory[0].orphan);
  // family.save(err => {
  //   if (err) {
  //     // console.log(err);
  //     res.status(500).json({
  //       message: 'MongoDB error',
  //       source: 'visit.js',
  //       error: err
  //     });
  //   } else {
  //     if (req.body.familyCategory[0].orphan) {
  //       let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
  //       orphanFamily.save();
  //     }
  //     visitReports.save();
  //     // familyMembers.save();
  //     return res.status(201).json({
  //       message: 'New Visit data created!'
  //     });
  //   }
  // });
  // });
// });

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Family.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
    return res.status(200).json({message: 'existing data updated!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in PATCH Family route'});
  }
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    let fam  = await Family.findByIdAndDelete({'_id': req.params.id});
    await VisitReports.deleteOne({'familyId': fam['familyId']});
    await FamilyMembers.deleteOne({'familyId': fam['familyId']});
    await OrphanFamily.deleteOne({'familyId': fam['familyId']});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
  // Family.findByIdAndDelete({'_id': req.params.id}, (err, fam) => {
  //   if (err) {
  //     res.status(500).json({
  //       message: 'failed to delete family data',
  //       error: err
  //     });
  //   } else {
  //     VisitReports.deleteOne({'familyId': fam['familyId']}, err => {
  //       if (err) {
  //         // console.log(err);
  //         return res.status(500).json({
  //           message: 'failed to delete visit report',
  //           error: err
  //         });
  //       } else {
  //         FamilyMembers.deleteOne({'familyId': fam['familyId']}, err => {
  //           if (err) {
  //             // console.log(err);
  //             return res.status(500).json({
  //               message: 'failed to delete visit report',
  //               error: err
  //             });
  //           } else {
  //             OrphanFamily.deleteOne({'familyId': fam['familyId']}, err => {
  //               if (err) {
  //                 return res.status(500).json({
  //                   message: 'failed to delete visit report',
  //                   error: err
  //                 });
  //               } else {
  //                 return res.json({
  //                   message: 'deleted'
  //                 });
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
})

module.exports = router;
