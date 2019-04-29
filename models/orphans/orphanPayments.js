const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanPaymentSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  sponsorshipId: { type: String, default: '' },
  amountPaid: { type: String, default: '' },
  dateOfPayment: { type: String, default: '' },
  dateOfRequiredPayment: { type: String, default: '' },
  bondNumber: { type: String, default: '' },
  receiptNumber: { type: String, default: '' },
  notes: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('OrphanPayment', OrphanPaymentSchema);
