const jwt = require('jsonwebtoken')
const newDocument = require('../utils/createNewDoc')

const getOneDocument = async (req, res, Model, searchObject = {}) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.findOne(searchObject)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
}

const getALLDocuments = async (
  req,
  res,
  Model,
  searchObject = {},
  clientSideTableDataString = ''
) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        let result = await Model.find(searchObject, clientSideTableDataString)
        return res.status(200).json({ data: result })
      } catch (err) {
        res.status(500).json({ message: 'Error in GET assistance route' })
      }
    }
  })
}

const postNewDocument = async (req, res, Model) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      let model = new Model(newDocument(Model.schema.obj, req.body))
      try {
        await model.save()
        return res.status(201).json({ message: 'new data created!', authData })
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(422).json({ message: 'no duplicates' })
        }
        res.status(500).json({ message: 'Error in POST visit route' })
      }
    }
  })
}

const patchOneById = async (req, res, Model) => {
  jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      try {
        await Model.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )
        return res.status(200).json({ message: 'existing data updated!' })
      } catch (err) {
        res.status(500).json({ message: 'Error in PATCH visit route' })
      }
    }
  })
}

const deleteOneById = async (req, res, Model) => {
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
  deleteOneById,
  patchOneById,
  postNewDocument,
  getALLDocuments,
  getOneDocument
}
