const jwt = require('jsonwebtoken')
const FamilyModel = require('../models/Archives/family/family')

const eidAlAdha = async (req, res, findObject, clientData) => {
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

module.exports = eidAlAdha
