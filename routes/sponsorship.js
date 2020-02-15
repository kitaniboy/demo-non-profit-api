const express = require('express')
const router = express.Router()

const Model = require('../models/Archives/sponsorship')
const Controller = require('../controller/controllerTest')

// Middleware
const verifyToken = require('../middleware/verifyToken')

router.get('/:id', verifyToken, async (req, res) =>
  Controller.getOneDocument(req, res, Model, { _id: req.params['id'] })
)
router.get('/', verifyToken, async (req, res) =>
  Controller.getALLDocuments(req, res, Model)
)
router.post('/', verifyToken, async (req, res) =>
  Controller.postNewDocument(req, res, Model)
)
router.patch('/:id', verifyToken, async (req, res) =>
  Controller.patchOneById(req, res, Model)
)
router.delete('/:id', (req, res) => Controller.deleteOneById(req, res, Model))

module.exports = router
