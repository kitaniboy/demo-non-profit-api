var express = require('express');
var router = express.Router();

const Family = require('../models/family/family');
const Address = require('../models/family/familyAddress');

/* GET home page. */
router.get('/', function(req, res, next) {
  Family.find((err, fam) => {
    // console.log(fam[0].address);
    Address.findOne((err, result) => {
      res.json({
        family: fam,
        address: result
      });
    });
  });
});

module.exports = router;
