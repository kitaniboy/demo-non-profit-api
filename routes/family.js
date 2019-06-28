const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// core imports
const Family = require('../models/Archives/family/family');
const VisitReports = require('../models/Archives/homeVisits/visitReports');
const FamilyMembers = require('../models/Archives/familyMembers');
const createNewDocument = require('../utils/createNewDoc');
const verifyToken = require('../middleware/verifyToken');
const clientSideTableData = require('../utils/tableSchema');

/* GET all per table columns on frontend */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({}, '-ramadan');
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/main', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({}, clientSideTableData.family.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

//! Do I need this???
/* GET all per table columns on frontend */
router.get('/orphanWaitList', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isWaitList: true,isArchived: false,typeOfAssistanceNeeded:'كفالة ايتام',isApproved:false}, clientSideTableData.family.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

//! do I need this route???
/* GET all per table columns on frontend */
router.get('/lowIncomeWaitList', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isWaitList: true,isArchived: false, typeOfAssistanceNeeded:'اسرة معسرة'}, clientSideTableData.family.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/archived', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({isArchived: true}, clientSideTableData.family.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/report', verifyToken, async (req, res) => {
  /* report is embedded in family schema that is why this exists */
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({}, clientSideTableData.report.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/ramadan', verifyToken, async (req, res) => {
  /* ramadan is embedded in family schema that is why this exists */
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        // 'familyAddress.0.state':'السيب'
        let result = await Family.find({isArchived: false, isRamadan: true}, clientSideTableData.ramadan.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET one in preparation for edit */
router.get('/ramadan/:id', verifyToken, async (req, res) => {
  // !need to add auth to this
  try {
    let result = await Family.findOne({isArchived: false, isRamadan: true,'_id': req.params['id']}, clientSideTableData.ramadanOne.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

/* GET all per table columns on frontend */
router.get('/ramadanPrint', verifyToken, async (req, res) => {
  // !need to add auth to this
  try {
    let result = await Family.find({isArchived: false, isRamadan: true,'ramadan.0.isDone': true}, clientSideTableData.ramadanOne.join(' '));
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

/* GET all per table columns on frontend */
router.get('/ramadan/signature/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        /* signature data is so large that this route needed to be created */
        let result = await Family.findOne({isArchived: false, isRamadan: true,'_id': req.params['id']}, 'ramadan.signature');
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

// !do I need this route???
/* GET all per table columns on frontend */
router.get('/orphans', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({'typeOfAssistanceNeeded': 'كفالة ايتام', isWaitList: false, isApproved: true}, clientSideTableData.orphanFamilies.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET one in preparation for edit */
router.get('/orphans/:formId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.findOne({'formId': req.params['formId']}, clientSideTableData.orphanFamilies.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET all per table columns on frontend */
router.get('/print/:formId', verifyToken, async (req, res) => {
  /* Since this is being called by a page that is separate (hosted on netlify)
  client-side auth using jwt is tricky so for now we don't authenticate this */
  try {
    let result = await Family.find({'formId': req.params['formId']});
    return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET family route'});
  }
});

/* GET all per table columns on frontend */
router.get('/:formId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.find({'formId': req.params['formId']}, clientSideTableData.familyMembers.join(' '));
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* GET one in preparation for edit */
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        let result = await Family.findOne({'_id': req.params['id']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});


/* POST new document to DB */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      /* Since family schema is related to visitReports and ramadan schema,
    then we need to make sure that when a family is created these documents
    should be created as well */
      let family = new Family(createNewDocument(Family.schema.obj, req.body));
      let visitReports = new VisitReports(createNewDocument(VisitReports.schema.obj, req.body));
      // !for some reason this needs to be manual
      // !gotta find a better solution
      family.ramadan.push({  breakfast:false,
        eidSupport: false,
        zakat: false,
        eidSacrifice: false,
        isDone:false,
        date: '' ,
        bookBags: '0',
        eidSupportAmount: '0',
        notes: ''});
      // !a hack to make it easy to patch visitReports
      // !need to find a better solution
      visitReports.family_id = family._id;
      try {
        await family.save();
        await visitReports.save();
        return res.status(201).json({message: 'New Visit document created!'});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* PATCH existing document */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403);
    } else {
      try {
        /* Since family schema is related to visitReports schema,
    then we need to make sure that when a family is patched this document
    should be patched as well */
        await Family.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        await VisitReports.findOneAndUpdate({'family_id': req.params.id}, {'formId': req.body.formId});
        return res.status(200).json({message: 'existing document updated!'});
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    }
  });
});

/* DELETE existing document */
router.delete('/:id', async (req, res) => {
  /* No authentication is included because delete route does not
  send back a response body so no way to check using jwt. in this
  case authentication is left to the frontend
  */
  try {
    /* Since family schema is related to visitReports and Family member schema,
    then we need to make sure that when a family is delete these documents
    should be deleted as well */
    let fam  = await Family.findByIdAndDelete({'_id': req.params.id});
    await VisitReports.deleteOne({'formId': fam['formId']});
    await FamilyMembers.deleteOne({'familyId': fam['familyId']});
    return res.status(200).json({message: 'existing document deleted!'});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;
