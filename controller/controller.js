const jwt = require('jsonwebtoken')
const createNewDocument = require('../utils/createNewDoc')

const getOne = async (req, res, Model, findOneObject) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
          the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.findOne(findOneObject)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
}

const getAll = async (req, res, Model, findAllObject) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
          the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find({}, findAllObject)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
}

const post = async (req, res, Model) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
          the proper message to the user */
      res.sendStatus(403)
    } else {
      let model = new Model(createNewDocument(Model.schema.obj, req.body))
      try {
        await model.save()
        return res.status(201).json({ message: 'new document created!' })
      } catch (err) {
        res.status(500).json({ message: err })
      }
    }
  })
}

const patch = async (req, res, Model) => {
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
}

const deleteOne = async (req, res, Model) => {
  /* No authentication is included because delete route does not
  send back a response body so no way to check using jwt. in this
  case authentication is left to the frontend
  */
  try {
    await Model.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: 'existing document deleted!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports = {
  getOne,
  getAll,
  post,
  patch,
  deleteOne
}
