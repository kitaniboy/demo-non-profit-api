const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// core imports
const Model = require('../../models/productiveFamilies/notifications')
const verifyToken = require('../../middleware/verifyToken')
// const clientSideTableData = require('../utils/tableSchema')

/* GET all per table columns on frontend */
router.get('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({})
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
})

/* PATCH existing document */
router.patch('/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
        the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        await Model.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )
        return res.status(200).json({ message: 'existing document updated!' })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
})

module.exports = router
