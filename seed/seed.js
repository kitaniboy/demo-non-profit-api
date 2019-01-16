// IMPORT MODELS
const Receptions = require('../models/receptions');

// IMPORT MONGOOSE AND MONGODB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

const iterate = 100;

// POPULATE DATA
populateData(iterate, Receptions);

function populateData(NumOfDocuments, Model) {
  for (let i =0; i < NumOfDocuments; i++) {
    let model = [
      new Model({
        familyID: `${i}`,
        visitorName:  'ماهر',
        visitorPhone: '97440004',
        address:   'العذيبة',
        purposeOfVisit: 'اسئلة',
        response: 'اسئلة',
        caseAgent: 'تم نقل الى الارشفة',
        caseCategory: 'عاجلة',
        documentsMissing: 'شهادة الميلاد'
      })
    ];

    let done = 0;
    for (let j = 0; j < model.length; j++) {
      model[j].save(err => {
        if (err) {
          console.log(err);
        }
        done++;
        if (done === model.length) {
          console.log('done seeding!');
          exit();
        }
      });
    }
  }
}

function exit() {
  mongoose.disconnect();
}