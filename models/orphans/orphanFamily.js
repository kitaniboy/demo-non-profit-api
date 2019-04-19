const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanFamilySchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  orphanFamilyId: { type: String, default: '' },
  formId: { type: String, default: '' },
  // motherName: { type: String, default: '' },
  // motherJob: { type: String, default: '' },
  // motherPhone: { type: String, default: '' },
  // familyAddress.state: { type: String, default: '' },
  // familyAddress.state: { type: String, default: '' },
  // familyAddress.governorate: { type: String, default: '' },
  // dadName: { type: String, default: '' },
  // nameOfGuardian: { type: String, default: ''},
  numberOfFamilyMembers: { type: String, default: '0' },
  males: { type: String, default: '0' },
  females: { type: String, default: '0' },
  numberOfOrphansWithSponsors: { type: String, default: '0'},
  allowance: { type: String, default: '0'},
  fileStatus: { type: String, default: 'فعال'},
  startDate: { type: String, default: ''},
  endDate: { type: String, default: ''},
  reasonForStop: { type: String, default: ''},
  accountOwner: { type: String, default: ''},
  bankName: { type: String, default: ''},
  bankAccountNumber: { type: String, default: ''},
  relation: { type: String, default: ''},
  notes: { type: String, default: ''}
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('OrphanFamily', OrphanFamilySchema);
