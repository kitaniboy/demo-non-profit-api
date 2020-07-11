const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model1 = require('../../models/Archives/family/family')
const familyMemberModel = require('../../models/Archives/familyMembers')
const ProductiveFamiliesModel = require('../../models/productiveFamilies/productiveFamilies')
const clientSideTableData = require('../../utils/tableSchema')
const createNewDocument = require('../../utils/createNewDoc')
const { Model } = require('mongoose')

// GET all productive families
router.get('/', async (req, res) => {
  try {
    // let productiveFamilies = await ProductiveFamiliesModel.find(
    //   {},
    //   clientSideTableData.productiveFamilies.join(' ')
    // )
    await ProductiveFamiliesModel.find(
      {},
      clientSideTableData.productiveFamilies.join(' ')
    )
      .populate('familyMemberData')
      .exec(function(err, combinedData) {
        if (err) {
          console.log(err)
        }

        return res.status(200).json({ data: combinedData })
      })
    // return res.status(200).json({ data: productiveFamilies })
  } catch (err) {
    console.log(err)
  }
})

// GET all family members that are part of productive family
router.get('/members', async (req, res) => {
  try {
    let familyMembers = await familyMemberModel.find(
      {
        isProductiveFamilyMember: true
      },
      clientSideTableData.productiveFamilyMembers.join(' ')
    )
    return res.status(200).json({ data: familyMembers })
  } catch (err) {
    console.log(err)
  }
})

// GET ONE
router.get('/getOne/:id', async (req, res) => {
  try {
    let prodfamily = await ProductiveFamiliesModel.findOne({
      _id: req.params['id']
    })
    // let family = await Model1.findOne(
    //   { formId: prodfamily.formId },
    //   clientSideTableData.possibleProductiveFamilies.join(' ')
    // )
    return res.status(200).json({
      data: [
        {
          ...prodfamily.toObject()
          //  ...family.toObject()
        }
      ]
    })
  } catch (err) {
    console.log(err)
  }
})

// POST ONE
// router.post('/', async (req, res) => {
//   let model = new ProductiveFamiliesModel(
//     createNewDocument(ProductiveFamiliesModel.schema.obj, req.body)
//   )
//   try {
//     await model.save()
//     return res.status(201).json({ message: 'new document created!' })
//   } catch (err) {
//     res.status(500).json({ message: err })
//   }
// })

// PATCH ONE
router.patch('/:id', async (req, res) => {
  try {
    await ProductiveFamiliesModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    )
    return res.status(200).json({ message: 'existing document updated!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

module.exports = router
