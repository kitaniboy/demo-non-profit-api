const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Model = require('../models/users')
// const newDocument = require('../utils/createNewDoc');

/* GET route */
router.get('/:id', async (req, res) => {
  // await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
  // if (err) {
  // res.sendStatus(403);
  // } else {
  try {
    let result = await Model.findOne({ _id: req.params['id'] })
    return res.status(200).json({ data: result })
  } catch (err) {
    res.status(500).json({ message: 'Error in GET users route' })
  }
  // }
  // });
})

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Model.find()
    return res.status(200).json({ data: result })
  } catch (err) {
    res.status(500).json({ message: 'Error in GET Users route' })
  }
})

/* POST route */
router.post('/', async (req, res) => {
  // let model = new Model(newDocument(Model.schema.obj, req.body));
  let hash = await bcrypt.hashSync(req.body.password, 8)
  let model = new Model({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    wedding: req.body.wedding,
    lowIncome: req.body.lowIncome,
    orphan: req.body.orphan,
    reception: req.body.reception,
    admin: req.body.admin,
    delegate: req.body.delegate,
    finance: req.body.finance,
    productive: req.body.productive
  })
  try {
    await model.save()
    return res.status(201).json({ message: 'new data created!' })
  } catch (err) {
    res.status(500).json({ message: 'Error in POST Users route' })
  }
})

/* PATCH route */
router.patch('/:id', async (req, res) => {
  try {
    await Model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    return res.status(200).json({ message: 'existing data updated!' })
  } catch (err) {
    res.status(500).json({ message: 'Error in PATCH Users route' })
  }
})

/* DELETE route */
router.delete('/:id', async (req, res) => {
  try {
    await Model.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: 'existing data deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Error in DELETE Users route' })
  }
})

module.exports = router
