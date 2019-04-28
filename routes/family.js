const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Family = require('../models/Archives/family/family');
const VisitReports = require('../models/Archives/homeVisits/visitReports');
const FamilyMembers = require('../models/Archives/familyMembers');
const newDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');

let childListMain = [
  '_id',
  'wife.wifeName',
  'wife.wifePhone',
  'wife.wifeCivilId',
  'husband.husbandName',
  'husband.husbandPhone',
  'husband.husbandCivilId',
  'dateOfCaseStudy',
  'familyId',
  'formId',
  'isRamadan'
];

let childListRamadan = [
  'wife',
  'husband',
  'familyId',
  'ramadan',
  '_id'
];

let childListReport = [
  //'isArchived',
  'typeOfAssistanceNeeded',
  'dateOfCaseStudy',
  'claimMadeBy',
  'formId',
  'familyCategory',
  'wife.wifeName',
  'wife.wifePhone',
  'wife.wifeCivilId',
  'husband.husbandName',
  'husband.husbandCivilId',
  'husband.husbandPhone',
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
  'husband.husbandName',
  'husband.husbandCivilId',
  'husband.husbandPhone',
  'familyCategory',
  'wife.wifeName',
  'guardian.guardianName',
  'wife.wifeCivilId',
  'wife.wifePhone',
  'formId',
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
        let result = await Family.find({}, '-ramadan');
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/main', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({}, childListMain.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/orphanWaitList', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isWaitList: true,isArchived: false,typeOfAssistanceNeeded:'كفالة ايتام',isApproved:false}, childListMain.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/lowIncomeWaitList', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isWaitList: true,isArchived: false, typeOfAssistanceNeeded:'اسرة معسرة'}, childListMain.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/archived', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isArchived: true}, childListMain.join(' '));
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
router.get('/ramadan', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        // 'familyAddress.0.state':'السيب'
        let result = await Family.find({isArchived: false, isRamadan: true}, {'wife.wifeName':1,'ramadan':1,'familyId':1,'husband.husbandName':1,'husband.husbandPhone':1,'husband.husbandCivilId':1,'wife.wifePhone':1,'wife.wifeCivilId':1,'familyAddress.state':1});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/ramadan/signature/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.findOne({isArchived: false, isRamadan: true,'_id': req.params['id']}, 'ramadan.signature');
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
        let result = await Family.find({'typeOfAssistanceNeeded': 'كفالة ايتام', isWaitList: false, isApproved: true}, childListOrphans.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for visitReports
router.get('/orphans/:formId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.findOne({'formId': req.params['formId']}, childListOrphans.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET family route'});
      }
    }
  });
});

// get specific data points needed for familyMember
router.get('/print/:formId', verifyToken, async (req, res) => {
  // await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  // if (err) {
  // res.sendStatus(403);
  // } else {
  try {
    let result = await Family.find({'formId': req.params['formId']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
  // }
  // });
});

// get specific data points needed for familyMember
router.get('/:formId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({'formId': req.params['formId']}, childListFamilyMembers.join(' '));
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
      family.ramadan.push({breakfast:  false,
        eidSupport:  false,
        zakat: false,
        eidSacrifice:  false,
        date: '',
        signature: '',
        isDone: false});
      // let ramadan = new ();
      try {
        await family.save();
        await visitReports.save();
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
        console.log(err);
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
    await VisitReports.deleteOne({'formId': fam['formId']});
    await FamilyMembers.deleteOne({'familyId': fam['familyId']});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE assistance route'});
  }
  //   }
  // });
});

module.exports = router;
