const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const FamilyModel = require('../../models/Archives/family/family')

router.get('/', async (req, res) => {
    // get all active families count
    let familyCount = await FamilyModel.find({isArchived: false}, 'formId').count();
    console.log(familyCount);
})

module.exports = router