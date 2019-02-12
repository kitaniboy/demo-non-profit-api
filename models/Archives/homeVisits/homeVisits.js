const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeVisitsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  visitNumber: { type: String, default: '' },
  familyId: { type: String, default: ''},
  familyName: { type: String, default: '' },
  dateOfVisit: { type: String, default: '' }, // default on frontEnd
  timeOfVisit: { type: String, default: '' }, // default on frontEnd
  address: { type: String, default: ''},
  teamName: { type: String, default: '' },
  teamComments: { type: String, default: '' },
  dateOfCaseStudy: { type: String, default: '' },
  dateOfLetter: { type: String, default: '' } // default on frontEnd
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('HomeVisits', homeVisitsSchema);
