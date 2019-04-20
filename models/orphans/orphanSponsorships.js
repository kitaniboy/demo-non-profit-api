const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanSponsorshipsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  sponsorId: { type: String, default: '' },
  sponsorshipId: { type: String, default: '' },
  orphanId: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  amount: { type: String, default: '' },
  paymentMethod: { type: String, default: '' },
  sponsorshipStatus: { type: String, default: '' },
  notes: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('OrphanSponsorships', OrphanSponsorshipsSchema);
