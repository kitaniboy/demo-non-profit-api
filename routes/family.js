const express = require('express');
const router = express.Router();

const Family = require('../models/family/family');
const VisitReports = require('../models/homeVisits/visitReports');
const FamilyMembers = require('../models/familyMembers');

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
  'guardian',
  'numberOfResidenceInHouseHold',
  'maleUnemployedAdultChildren',
  'femaleUnemployedAdultChildren',
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

router.get('/', (req, res) => {
  Family.find((err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'siteVisit.js'
      });
    } else {
      res.status(200).json({data: result});
    }
  });
});

// get specific data points needed for visitReports
router.get('/report', (req, res) => {
  Family.find({}, childListReport.join(' '), ((err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'siteVisit.js'
      });
    } else {
      res.status(200).json({data: result});
    }
  }));
});

// get specific data points needed for visitReports
router.get('/orphans', (req, res) => {
  Family.find({'familyCategory.0.orphan': true}, childListOrphans.join(' '), ((err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'siteVisit.js'
      });
    } else {
      res.status(200).json({data: result});
    }
  }));
});

// get specific data points needed for familyMember
router.get('/:familyId', (req, res) => {
  Family.findOne({'familyId': req.params['familyId']}, childListFamilyMembers.join(' '), ((err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'failed to get family data',
        error: err
      });
    } else {
      res.status(200).json({data: result});
    }
  }));
});


/* POST route */
router.post('/', function(req, res) {
  // jwt.verify(req.token, process.env.SECRET, (err, authData) => {
  // if (err) return res.status(403).json({message: 'Forbidden, 47:67'});

  let family = new Family(newDocument(Family.schema.obj, req.body));
  let visitReports = new VisitReports(newDocument(VisitReports.schema.obj, req.body));
  // let familyMembers = new FamilyMembers(newDocument(FamilyMembers.schema.obj, req.body));
  family.save(err => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        message: 'MongoDB error',
        source: 'visit.js',
        error: err
      });
    } else {
      visitReports.save();
      // familyMembers.save();
      return res.status(201).json({
        message: 'New Visit data created!'
      });
    }
  });
  // });
});

/* PATCH route */
router.patch('/:id', function(req, res) {
  Family.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, err => {
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
  Family.findByIdAndDelete({'_id': req.params.id}, (err, fam) => {
    if (err) {
      res.status(500).json({
        message: 'failed to delete family data',
        error: err
      });
    } else {
      VisitReports.deleteOne({'familyId': fam['familyId']}, err => {
        if (err) {
          // console.log(err);
          return res.status(500).json({
            message: 'failed to delete visit report',
            error: err
          });
        } else {
          FamilyMembers.deleteOne({'familyId': fam['familyId']}, err => {
            if (err) {
              // console.log(err);
              return res.status(500).json({
                message: 'failed to delete visit report',
                error: err
              });
            } else {
              return res.json({
                message: 'deleted'
              });
            }
          })
        }
      })
    }
  })
})

module.exports = router;
