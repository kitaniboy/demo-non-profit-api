const express = require('express')
// const jwt = require('jsonwebtoken')
const router = express.Router()

const Model = require('../../models/lowIncome/insolventFamilies')
const controller = require('../../controller/controller')
// const newDocument = require('../../utils/createNewDoc')
const verifyToken = require('../../middleware/verifyToken')
const clientSideTableData = require('../../utils/tableSchema')

router.get('/:id', verifyToken, async (req, res) =>
  controller.getOne(req, res, Model, { _id: req.params['id'] })
)
router.get('/', verifyToken, async (req, res) =>
  controller.getAll(
    req,
    res,
    Model,
    clientSideTableData.insolventFamilies.join(' ')
  )
)
router.post('/', verifyToken, async (req, res) =>
  controller.postOne(req, res, Model)
)
router.patch('/:id', verifyToken, async (req, res) =>
  controller.patchOne(req, res, Model, { _id: req.params.id })
)
router.delete('/:id', async (req, res) => controller.deleteOne(req, res, Model))

module.exports = router
