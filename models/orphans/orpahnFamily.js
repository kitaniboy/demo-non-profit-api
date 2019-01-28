const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanFamilySchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  numberOfOrphansWithSponsors: { type: String, default: ''},
  socialSecurity: { type: String, default: ''},
  accountOwner: { type: String, default: ''},
  bankName: { type: String, default: ''},
  bankAccountNumber: { type: String, default: ''},
  allowance: { type: String, default: ''},
  relation: { type: String, default: ''},
  nameOfGuardian: { type: String, default: ''},
  fileStatus: { type: String, default: ''}, // active or not
  startDate: { type: String, default: ''},
  endDate: { type: String, default: ''},
  reasonForStop: { type: String, default: ''},
  notes: { type: String, default: ''},
  familyId: { type: String, ref: 'Family'}
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('OrphanFamily', OrphanFamilySchema);
