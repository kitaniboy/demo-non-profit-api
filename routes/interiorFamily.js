const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const interiorFamily = require('../models/Archives/family/interiorFamily')
const newDocument = require('../utils/createNewDoc')
const verifyToken = require('../middleware/verifyToken')

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
  'isRamadan',
  'familyAddress.state',
  'familyAddress.town',
  'isArchived'
]

/* GET route */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await interiorFamily.find({}, '-ramadan')
        // .sort({ formId: 1, familyId: 1 })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET family route' })
      }
    }
  })
})

// get specific data points needed for visitReports
router.get('/main', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await interiorFamily.find({}, childListMain.join(' '))
        // .sort({ formId: 1 })
        // result.forEach(r => {
        //   r.formId = parseInt(r.formId)
        // })
        // console.log(result)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET family route' })
      }
    }
  })
})

// get specific data points needed for familyMember
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await interiorFamily.findOne({ _id: req.params['id'] })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET family route' })
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
      let family = new interiorFamily(
        newDocument(interiorFamily.schema.obj, req.body)
      )
      try {
        await family.save()
        return res.status(201).json({ message: 'New Visit data created!' })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET family route' })
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
        await interiorFamily.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )
        return res.status(200).json({ message: 'existing data updated!' })
      } catch (err) {
        res.status(500).json({ message: 'Error in PATCH Family route' })
      }
    }
  })
})

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await interiorFamily.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: 'existing data deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Error in DELETE assistance route' })
  }
})

module.exports = router
