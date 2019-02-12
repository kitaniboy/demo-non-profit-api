const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LowIncomeSponsorsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  sponsorId: { type: String, default: '' },
  sponsorName: { type: String, default: '' },
  sponsorPhone: { type: String, default: '' },
  paymentMethod: { type: String, default: '' },
  paymentAmount: { type: String, default: '' },
  dateOfPayment: { type: String, default: '' },
  familyId: { type: String, default: '' },
  familyName: { type: String, default: '' },
  notes: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('LowIncomeSponsors', LowIncomeSponsorsSchema);
