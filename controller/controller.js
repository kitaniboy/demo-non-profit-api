const jwt = require('jsonwebtoken')
const createNewDocument = require('../utils/createNewDoc')

const getOne = async (req, res, Model, findOneObject) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
          the proper message to the user */
      res.sendStatus(403).json({ message: 'no right' })
    } else {
      try {
        let result = await Model.findOne(findOneObject)
        return res.status(200).json({ data: result })
      } catch (err2) {
        res.status(500).json({ message: err2 })
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
      } catch (err2) {
        res.status(500).json({ message: err2 })
      }
    }
  })
}

const postOne = async (req, res, Model) => {
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
      } catch (err2) {
        res.status(500).json({ message: err2 })
      }
    }
  })
}

const patchOne = async (req, res, Model, patchOneObject) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      /* client side should view all 403 as an auth error and deliver
          the proper message to the user */
      res.sendStatus(403)
    } else {
      try {
        console.log(patchOneObject)
        await Model.findByIdAndUpdate(patchOneObject, { $set: req.body })
        return res.status(200).json({ message: 'existing document updated!' })
      } catch (err2) {
        res.status(500).json({ message: err2 })
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
  } catch (err2) {
    res.status(500).json({ message: err2 })
  }
}

module.exports = {
  getOne,
  getAll,
  postOne,
  patchOne,
  deleteOne
}
