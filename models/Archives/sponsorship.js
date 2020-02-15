const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsorshipSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  sponsorshipId: { type: String, default: ''},
  formId: { type: String, default: '' },
  sponsorshipFormId: { type: String, default: '' },
  husbandName: { type: String, default: '' },
  wifeName: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  familyCategory: { type: String, default: '' },
  typeOfSponsorship: { type: String, default: '' },
  recipientName: { type: String, default: '' },
  recipientNameEnglish: { type: String, default: '' },
  recipientPhone: { type: String, default: '' },
  amount: { type: String, default: '' },
  bankAccount: { type: String, default: '' },
  bank: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  notes: { type: String, default: '' },
  isClosed: { type: Boolean, default: false },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Sponsorship', SponsorshipSchema);
