const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeVisitsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  visitNumber: { type: String, default: '1' },
  familyId: { type: String, default: 'جديد'},
  familyName: { type: String, default: '' },
  dateOfVisit: { type: String }, // default on frontEnd
  timeOfVisit: { type: String }, // default on frontEnd
  address: { type: String, default: ''},
  teamName: { type: String, default: '' },
  teamComments: { type: String, default: '' },
  dateOfLetter: { type: String } // default on frontEnd
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('HomeVisits', homeVisitsSchema);
