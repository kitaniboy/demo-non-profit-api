const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LowIncomePaymentsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  paymentId: { type: String, default: '' },
  sponsorshipId: { type: String, default: '' },
  familyId: { type: String, default: '' },
  paymentAmount: { type: String, default: '' },
  amountPaid: { type: String, default: '' },
  typeOfPayment: { type: String, default: '' },
  dateOfPayment: { type: String, default: '' },
  dateOfRequiredPayment: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('LowIncomePayments', LowIncomePaymentsSchema);
