const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Model1 = require('../../models/Archives/family/family')
const Model2 = require('../../models/productiveFamilies/productiveFamilies')
const clientSideTableData = require('../../utils/tableSchema')
const createNewDocument = require('../../utils/createNewDoc')

// GET ALL
router.get('/', async (req, res) => {
  try {
    let families = await Model1.find(
      {},
      clientSideTableData.possibleProductiveFamilies.join(' ')
    )
    let y = []
    for (let i = 0; i < families.length; i++) {
      let x = await Model2.find(
        { formId: families[i].formId },
        clientSideTableData.productiveFamilies.join(' ')
      )
      if (x.length != 0) {
        let z = Object.assign({}, x[0].toObject(), families[i].toObject())
        y.push(z)
      } else {
        y.push(families[i])
      }
    }
    // console.log(y)
    return res.status(200).json({ data: y })
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

module.exports = router
