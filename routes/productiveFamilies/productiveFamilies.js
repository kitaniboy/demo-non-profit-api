const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model1 = require('../../models/Archives/family/family')
const familyMemberModel = require('../../models/Archives/familyMembers')
const Model2 = require('../../models/productiveFamilies/productiveFamilies')
const clientSideTableData = require('../../utils/tableSchema')
const createNewDocument = require('../../utils/createNewDoc')
const { Model } = require('mongoose')

router.get('/:id', async (req, res) => {
  try {
    let prodfamily = await Model2.findOne(
      { _id: req.params['id'] },
      clientSideTableData.productiveFamilies.join(' ')
    )
    let family = await Model1.findOne(
      { formId: prodfamily.formId },
      clientSideTableData.possibleProductiveFamilies.join(' ')
    )
    return res
      .status(200)
      .json({ data: [{ ...prodfamily.toObject(), ...family.toObject() }] })
  } catch (err) {
    console.log(err)
  }
})

// GET ALL
router.get('/', async (req, res) => {
  try {
    let familyMembers = await familyMemberModel.find({
      isProductiveFamilyMember: true
    })
    return res.status(200).json({ data: familyMembers })
  } catch (err) {
    console.log(err)
  }
})

// POST ONE
router.post('/', async (req, res) => {
  let model = new Model2(createNewDocument(Model2.schema.obj, req.body))
  try {
    await model.save()
    return res.status(201).json({ message: 'new document created!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// PATCH ONE
router.patch('/:id', async (req, res) => {
  try {
    await Model2.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    return res.status(200).json({ message: 'existing document updated!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

module.exports = router
