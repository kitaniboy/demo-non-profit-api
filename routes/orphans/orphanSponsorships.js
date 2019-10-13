const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model = require('../../models/orphans/orphanSponsorships')
const OrphanModel = require('../../models/orphans/orphans')
const newDocument = require('../../utils/createNewDoc')
const verifyToken = require('../../middleware/verifyToken')

// let TableData = [
//   'sponsorName',
//   'sponsorId',
//   'sponsorPhone',
//   'numberOfSponsored',
//   'sponsorAmount',
//   'paymentMethod',
//   'sponsorStatus',
//   'sponsorBankAccountNum',
//   'sponsorBank',
// ];

/* GET route */
router.get('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.findOne({ _id: req.params['id'] })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})
/* GET route */
router.get('/getBy/:sponsorId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({ sponsorId: req.params['sponsorId'] })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})

/* GET route */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result1 = await Model.find({})
        let y = []
        for (let i = 0; i < result1.length; i++) {
          let x = await OrphanModel.find(
            { orphanId: result1[i].orphanId },
            'orphanName'
          )
          if (x.length != 0) {
            let z = Object.assign({}, x[0].toObject(), result1[i].toObject())
            y.push(z)
          } else {
            y.push(result1[i])
          }
        }
        return res.status(200).json({ data: y })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})

router.get('/getOne/:sponsorshipId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.findOne({
          sponsorshipId: req.params['sponsorshipId']
        })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET orphanSponsor route' })
      }
    }
  })
})

/* POST route */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      let model = new Model(newDocument(Model.schema.obj, req.body))
      try {
        await model.save()
        return res.status(201).json({ message: 'new data created!' })
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(422).json({ message: err })
        }
        res.status(500).json({ message: 'Error in POST orphanSponsor route' })
      }
    }
  })
})

/* PATCH route */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        await Model.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )
        return res.status(200).json({ message: 'existing data updated!' })
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(422).json({ message: err })
        }
        res.status(500).json({ message: 'Error in PATCH orphanSponsor route' })
      }
    }
  })
})

/* DELETE route */
router.delete('/:id', async (req, res) => {
  // await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  try {
    await Model.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: 'existing data deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Error in DELETE OrphanSponsors route' })
  }
  //   }
  // });
})

module.exports = router
