const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model = require('../models/Archives/familyMembers')
const ProductiveFamilyModel = require('../models/productiveFamilies/productiveFamilies')
const NotificationsModel = require('../models/productiveFamilies/notifications')
const newDocument = require('../utils/createNewDoc')
const createNewDocument = require('../utils/createNewDoc')
const verifyToken = require('../middleware/verifyToken')

let TableData = [
  'health',
  'monthlyInstallment',
  'familyMemberLoan',
  'familyMemberSalary',
  'job',
  'relation',
  'familyMemberName',
  'familyMemberId',
  'familyId',
  '_id'
]

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
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({}, TableData.join(' '))
        return res.status(200).json({ data: result })
      } catch (err) {
        // console.log(err);
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
})

/* GET route */
router.get('/getOne/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({ familyId: req.params.id })
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET familyMembers route' })
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
        await model.save(err => {
          if (err) return err

          if (model.isProductiveFamilyMember) {
            const productiveFamily = new ProductiveFamilyModel({
              familyId: model.familyId,
              familyMemberData: model._id // assign the _id from the person
            })

            productiveFamily.save(async function(err) {
              if (err) return err
              // if no errors save logs of posting new information
              let notification = new NotificationsModel({
                message: 'ادخال فرد جديد',
                familyMemberId: req.body.familyMemberId,
                familyId: req.body.familyId,
                isClosed: 'لا',
                dateTime: new Date(),
                enteredBy: req.body.enteredBy
              })
              await notification.save()
            })
          }
        })
        return res.status(201).json({ message: 'new data created!' })
      } catch (err) {
        res.status(500).json({ message: 'Error in POST familyMember route' })
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
        let oldMemberData = await Model.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )

        // we fetch the new updated data
        // the data above wont return the updated document but the old one instead
        let newMemberData = await Model.findOne({ _id: req.params.id })

        if (newMemberData.isProductiveFamilyMember) {
          await ProductiveFamilyModel.countDocuments(
            {
              familyMemberData: [
                {
                  _id: newMemberData._id
                  // , familyId: member.familyId
                }
              ]
            },
            async (err, count) => {
              if (err) console.log(err)

              if (count === 0) {
                // if we don't have productive fam data
                const productiveFamily = await new ProductiveFamilyModel({
                  familyId: newMemberData.familyId,
                  familyMemberData: newMemberData._id // assign the _id from the person
                })

                await productiveFamily.save(async function(err) {
                  if (err) console.log(err)
                  // console.log('old', oldMemberData.isProductiveFamilyMember)
                  // console.log('new', newMemberData.isProductiveFamilyMember)
                  // if no errors save logs of posting new information
                  let notification = new NotificationsModel({
                    message: 'ادخال فرد جديد',
                    familyMemberId: req.body.familyMemberId,
                    familyId: req.body.familyId,
                    isClosed: 'لا',
                    dateTime: new Date(),
                    enteredBy: req.body.enteredBy
                  })
                  await notification.save()
                })
              } else {
                let notification = new NotificationsModel({
                  message: 'ادخال فرد سابق الى القائمة',
                  familyMemberId: req.body.familyMemberId,
                  familyId: req.body.familyId,
                  isClosed: 'لا',
                  dateTime: new Date(),
                  enteredBy: req.body.enteredBy
                })
                await notification.save()
              }
            }
          )
        } else {
          if (
            oldMemberData.isProductiveFamilyMember === true &&
            newMemberData.isProductiveFamilyMember === false
          ) {
            let notification = new NotificationsModel({
              message: 'اخراج فرد من القائمة',
              familyMemberId: req.body.familyMemberId,
              familyId: req.body.familyId,
              isClosed: 'لا',
              dateTime: new Date(),
              enteredBy: req.body.enteredBy
            })
            await notification.save()
          }
        }

        return res.status(200).json({ message: 'existing data updated!' })
      } catch (err) {
        res.status(500).json({ message: 'Error in PATCH familyMembers route' })
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
    res.status(500).json({ message: 'Error in DELETE familyMembers route' })
  }
  //   }
  // });
})

module.exports = router
