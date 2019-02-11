// IMPORT MODELS
const Receptions = require('../models/Archives/receptions');
const receptionSchema = require('./seedSchema');

// IMPORT MONGOOSE AND MONGODB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

const iterate = 2000;

// POPULATE DATA
populateData(iterate, Receptions);

function populateData(NumOfDocuments, Model) {
  for (let i =0; i < NumOfDocuments; i++) {
    let model = [
      new Model(receptionSchema(i))
    ];

    let done = 0;
    for (let j = 0; j < model.length; j++) {
      model[j].save(err => {
        if (err) {
          console.log(err);
        }
        done++;
        if (done === model.length) {
          // console.log('done seeding!');
          exit();
        }
      });
    }
  }
}

function exit() {
  mongoose.disconnect();
  console.log('done seeding!');
}