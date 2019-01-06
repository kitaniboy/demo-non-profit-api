const Visit = require('../models/visit');

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

for (let i =0; i < 100; i++) {
  let visits = [
    new Visit({
      familyID: `${i}`,
      visitorName:  'maher',
      visitorPhone: '97440004',
      address:   'العذيبة',
      purposeOfVisit: 'question about things',
      response: 'We are working on it',
      caseAgent: 'Moved to Archives',
      caseCategory: 'urgent',
      documentsMissing: 'birth certificate',
    })
  ];
  
  let done = 0;
  for (let i = 0; i < visits.length; i++) {
    visits[i].save(err => {
      if (err) {
        console.log(err);
      }
      done++;
      if (done === visits.length) {
        console.log('done seeding!');
        exit();
      }
    });
  }
}


function exit() {
  mongoose.disconnect();
}
