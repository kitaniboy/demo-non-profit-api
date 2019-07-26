const express = require('express')
const router = express.Router()

// core imports
const Model = require('../models/Archives/assistance/assistance')
const verifyToken = require('../middleware/verifyToken')
const clientSideTableData = require('../utils/tableSchema')
const controller = require('../controller/controller')

/* GET one in preparation for edit */
router.get('/:id', verifyToken, async (req, res) =>
  controller.getOne(req, res, Model, { _id: req.params['id'] })
)

/* GET all per table columns on frontend */
router.get('/', verifyToken, async (req, res) =>
  controller.getAll(req, res, Model, clientSideTableData.assistance.join(' '))
)

/* POST new document to DB */
router.post('/', verifyToken, async (req, res) => controller.post(req, res, Model))

/* PATCH existing document */
router.patch('/:id', verifyToken, async (req, res) =>
  controller.patch(req, res, Model)
)

/* DELETE existing document */
router.delete('/:id', async (req, res) => controller.deleteOne(req, res, Model))

module.exports = router
