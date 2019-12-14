const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model = require('../../models/orphans/orphanPayments')
const newDocument = require('../../utils/createNewDoc')
const verifyToken = require('../../middleware/verifyToken')
const SponsorModel = require('../../models/orphans/orphanSponsors')
const SponsorshipModel = require('../../models/orphans/orphanSponsorships')

/* GET route */
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.findOne({ _id: req.params['id'] })
        return res.status(200).json({ data: result })
      } catch (err) {
        // console.log(err);
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
        let result = await Model.find({})
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})

router.get('/:sponsorshipId', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({
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
        let sponsorshipDocument = await SponsorshipModel.findOneAndUpdate({
          sponsorshipId: model.sponsorshipId
        })
        await SponsorModel.findOneAndUpdate(
          {
            sponsorId: sponsorshipDocument.sponsorId
          },
          { hasPayments: true }
        )
        // console.log(sponsor)
        return res.status(201).json({ message: 'new data created!' })
      } catch (err) {
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
