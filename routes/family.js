const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Family = require('../models/Archives/family/family');
const VisitReports = require('../models/Archives/homeVisits/visitReports');
const FamilyMembers = require('../models/Archives/familyMembers');
const OrphanFamily = require('../models/orphans/orphanFamily');
const newDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');

let childListRamadhan = [
  'wife',
  'husband',
  'familyId',
  '_id'
];

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
  'wife',
  'familyId',
  '-_id'
];

/* GET route */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find();
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/report', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({}, childListReport.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/ramadhan', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isArchived: false}, childListRamadhan.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/orphans', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({'typeOfAssistanceNeeded': 'كفالة ايتام'}, childListOrphans.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for familyMember
router.get('/:familyId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({'familyId': req.params['familyId']}, childListFamilyMembers.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for familyMember
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.findOne({'_id': req.params['id']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});


/* POST route */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let family = new Family(newDocument(Family.schema.obj, req.body));
      let visitReports = new VisitReports(newDocument(VisitReports.schema.obj, req.body));
      try {
        await family.save();
        await visitReports.save();
        if (req.body.typeOfAssistanceNeeded === 'كفالة ايتام') {
          let orphanFamily = new OrphanFamily(newDocument(OrphanFamily.schema.obj, req.body));
          orphanFamily.save();
        }
        return res.status(201).json({message: 'New Visit data created!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

/* PATCH route */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        await Family.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing data updated!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in PATCH Family route'});
      }
    }
  });
});

/* DELETE route */
router.delete('/:id', async (req, res) => {
  // await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
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
  //   }
  // });
});

module.exports = router;
