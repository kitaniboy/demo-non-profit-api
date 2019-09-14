const express = require('express')
const router = express.Router()

const Model = require('../models/Archives/receptions')
const Controller = require('../controller/controllerTest')

// Middleware
const verifyToken = require('../middleware/verifyToken')

// data
const clientSideTableData = require('../utils/tableSchema')

router.get('/:id', verifyToken, async (req, res) =>
  Controller.getOneDocument(req, res, Model)
)
router.get('/', verifyToken, async (req, res) =>
  Controller.getALLDocuments(req, res, Model, {}, clientSideTableData.reception)
)
router.post('/', verifyToken, async (req, res) =>
  Controller.postNewDocument(req, res, Model)
)
router.patch('/:id', verifyToken, async (req, res) =>
  Controller.patchOneById(req, res, Model)
)
router.delete('/:id', async (req, res) =>
  Controller.deleteOneById(req, res, Model)
)

module.exports = router
