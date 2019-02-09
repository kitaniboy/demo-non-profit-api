const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Receptions = require('../models/Archives/receptions');
const verifyToken = require('../middleware/verifyToken');

const newDocument = (model, body) => {
  let obj ={};
  for (let i in model) {
    obj[i] = body[i];
  }
  return obj;
};

/* GET route */
router.get('/', async (req, res) => {
  try {
    let result = await Receptions.find({}, "-created_at -updated_at -__v");
    // let numOfDocs = await Receptions.find().countDocument();
    // console.log(numOfDocs);
    return res.write(res.json({data: result}))
    // return res.status(200).json({data: result});
  }
  catch(err) {
    res.status(500).json({message: 'Error in GET assistance route'});
  }
});

// /* GET route */
// router.get('/', verifyToken, async (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream')
//   res.setHeader('Cache-Control', 'no-cache')
//   await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       try {
//         let result = await Receptions.find();
//         res.flush()
//         return res.status(200).json({data: result, authData});
//       }
//       catch(err) {
//         res.status(500).json({message: 'Error in GET Receptions route'});
//       }
//     }
//   })
// });

/* POST route */
router.post('/', verifyToken, async (req, res) => {
  await jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let visit = new Receptions(newDocument(Receptions.schema.obj, req.body));
      try {
        await visit.save();
        return res.status(201).json({message: 'new data created!', authData});
      }
      catch(err) {
        res.status(500).json({message: 'Error in POST visit route'});
      }
    }
  })
});

/* PATCH route */
router.patch('/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        await Receptions.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body});
        return res.status(200).json({message: 'existing data updated!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in PATCH visit route'});
      }
    }
  });
});

/* DELETE route */
router.delete('/:id', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'alrahmasecrestkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        await Receptions.findByIdAndDelete({'_id': req.params.id});
        return res.status(200).json({message: 'existing data deleted!'});
      }
      catch(err) {
        res.status(500).json({message: 'Error in DELETE visit route'});
      }
    }
  })
});



module.exports = router;
