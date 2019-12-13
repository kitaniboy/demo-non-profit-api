const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const SponsorshipModel = require('../../models/orphans/orphanSponsorships')
const PaymentModel = require('../../models/orphans/orphanPayments')
const Model = require('../../models/orphans/orphanSponsors')
const newDocument = require('../../utils/createNewDoc')
const verifyToken = require('../../middleware/verifyToken')
const clientSideTableData = require('../../utils/tableSchema')

let TableData = [
  'sponsorName',
  'sponsorId',
  'sponsorPhone',
  'numberOfSponsored',
  'sponsorAmount',
  'paymentMethod',
  'sponsorStatus',
  'sponsorBankAccountNum',
  'sponsorBank'
]

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
router.get('/noPaymentSponsors', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let noPaymentSponsors = []
        let allSponsorships
        let allPayments
        // get all sponsors
        let allSponsors = await Model.find(
          {},
          clientSideTableData.orphanSponsors.join(' ')
        )

        // for each sponsor get all sponsorships
        for (let i = 0; i < allSponsors.length; i++) {
          allSponsorships = await SponsorshipModel.find({
            sponsorId: allSponsors[i].sponsorId
          })
          // console.log(allSponsorships)

          if (allSponsorships.length === 0) {
            let x = {
              ...JSON.parse(JSON.stringify(allSponsors[i])),
              sponsorshipId: 'لا يوجد'
            }
            // x.sponsorshipId = 'لا يوجد'
            noPaymentSponsors.push(x)
            // console.log(x)
          } else {
            // for each sponsorship get all payments
            for (let j = 0; j < allSponsorships.length; j++) {
              allPayments = await PaymentModel.find({
                sponsorshipId: allSponsorships[j].sponsorshipId
              })
              // console.log(allSponsorships[j].sponsorshipId, allPayments.length)
              // if no payment then insert into array
              if (allPayments.length === 0) {
                let x = {
                  ...JSON.parse(JSON.stringify(allSponsors[i])),
                  sponsorshipId: JSON.parse(JSON.stringify(allSponsorships[j]))
                    .sponsorshipId
                }
                noPaymentSponsors.push(x)
              }
            }
          }
        }

        return res.status(200).json({ data: noPaymentSponsors })
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
        let result = await Model.find({}, TableData.join(' '))
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})

router.get('/:sponsorId', verifyToken, async (req, res) => {
  //  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  //    if (err) {
  //      res.sendStatus(403);
  //    } else {
  try {
    let result = await Model.find({ sponsorId: req.params['sponsorId'] })
    return res.status(200).json({ data: result })
  } catch (err) {
    res.status(500).json({ message: 'Error in GET orphanSponsor route' })
  }
  //    }
  //  });
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
