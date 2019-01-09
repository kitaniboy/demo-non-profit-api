const Visit = require('../models/visit');
const SiteVisit = require('../models/siteVisit');
const Family = require('../models/family/family');
const FamilyAddress = require('../models/family/familyAddress');

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

// for (let i =0; i < 100; i++) {
//   let visits = [
//     new Visit({
//       familyID: `${i}`,
//       visitorName:  'maher',
//       visitorPhone: '97440004',
//       address:   'العذيبة',
//       purposeOfVisit: 'question about things',
//       response: 'We are working on it',
//       caseAgent: 'Moved to Archives',
//       caseCategory: 'urgent',
//       documentsMissing: 'birth certificate',
//     })
//   ];

//   let done = 0;
//   for (let i = 0; i < visits.length; i++) {
//     visits[i].save(err => {
//       if (err) {
//         console.log(err);
//       }
//       done++;
//       if (done === visits.length) {
//         console.log('done seeding!');
//         exit();
//       }
//     });
//   }
// }

// let siteVisit = [
//   new SiteVisit({
//     familyID: '2',
//     detailedAddress: '24 24 street',
//     fieldAgentName: "سعيد",
//     fieldAgentPhone: '97440004',
//     assistanceCategory: 'لاايتام',
//     DateOfVisit: Date.now(),
//     AgentReport: 'يحتاجوا مكيف',
//     AgentSuggestion: 'صحيح',
//     caseMovedTo: 'الارشيف'
//   })
// ];

// function populate(schema) {
//   let done = 0;
//   for (let i = 0; i < schema.length; i++) {
//     schema[i].save(err => {
//       if (err) {
//         console.log(err);
//       }
//       done++;
//       if (done === schema.length) {
//         console.log('done seeding!');
//         exit();
//       }
//     });
//   }
// }

let address = new FamilyAddress({
  governorate: 'muscat',
  state: 'boushar',
  town: 'azaiba',
  neighborhood: '52'
});



// address.save((err) => {
//   if (err) console.log(err);
// });

let family = 
new Family({
  familyID: '100', // family id
  familyCategory: { // OR STATUS?
    orphan: true,
  },
  claimMadeBy: 'people bin somone',
  dateOfCaseStudy: '1/9/2019',
  typeOfAssistanceNeeded: 'register orphans',
  address: address._id,
  children: [address]
})
;
family.save((err) => {
  if (err) return err;
});


// populate(family);


function exit() {
  mongoose.disconnect();
}
