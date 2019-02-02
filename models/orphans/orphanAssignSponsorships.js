const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanAssignSponsorshipsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  sponsorId: { type: String, default: '' },
  sponsorName: { type: String, default: '' },
  familyId: { type: String, default: '' },
  'wife.0.wifeName': { type: String, default: '' },
  orphanId: { type: String, default: '' },
  orphanName: { type: String, default: '' },
  sponsorshipStatus: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  sponsorshipAmount: { type: String, default: '' },
  paymentMethod: { type: String, default: '' },
  notes: { type: String, default: '' },
  sponsorshipAssignmentId: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('OrphanAssignSponsorships', OrphanAssignSponsorshipsSchema);
