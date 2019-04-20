const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Model = require('../../models/orphans/orphanSponsorships');
const newDocument = require('../../utils/createNewDoc');
const verifyToken = require('../../middleware/verifyToken');

// let TableData = [
//   'health',
//   'monthlyInstallment',
//   'familyMemberLoan',
//   'familyMemberSalary',
//   'job',
//   'relation',
//   'familyMemberName',
//   'familyMemberId',
//   'familyId',
//   '_id'
// ];

/* GET route */
router.get('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.findOne({'_id': req.params['id']});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* GET route */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({});
        return res.status(200).json({data: result});
      }
      catch(err) {
        // console.log(err);
        res.status(500).json({message: 'Error in GET assistance route'});
      }
    }
  });
});

/* GET route */
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        let result = await Model.find({'sponsorshipId': req.params.id});
        return res.status(200).json({data: result});
      }
      catch(err) {
        res.status(500).json({message: 'Error in GET familyMembers route'});
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
      let model = new Model(newDocument(Model.schema.obj, req.body));
      try {
        await model.save();
        return res.status(201).json({message: 'new data created!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in POST familyMember route'});
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
        await Model.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing data updated!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in PATCH familyMembers route'});
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
    await Model.findByIdAndDelete({'_id': req.params.id});
    return res.status(200).json({message: 'existing data deleted!'});
  }
  catch(err) {
    res.status(500).json({message: 'Error in DELETE familyMembers route'});
  }
  //   }
  // });
});

module.exports = router;
