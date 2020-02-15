const jwt = require('jsonwebtoken')
const FamilyModel = require('../models/Archives/family/family')

const getAllFamilies = async (req, res, findObject, clientData) => {
  /* eidAlAdha is embedded in family schema that is why this route exists */
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        let result = await FamilyModel.find(findObject, clientData)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
}

const getOneFamily = async (req, res, findOneObject, clientData) => {
  // !need to add auth to this
  try {
    let result = await FamilyModel.findOne(findOneObject, clientData)
    return res.status(200).json({ data: result })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const getSignature = async (req, res, findOneObject, clientData) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
      the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        /* signature data is so large that this route needed to be created */
        let result = await FamilyModel.findOne(findOneObject, clientData)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
}

module.exports = {
  getAllFamilies,
  getOneFamily,
  getSignature
}
