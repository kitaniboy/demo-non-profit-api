const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LowIncomePaymentsSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    paymentId: { type: String, default: '' },
    sponsorId: { type: String, default: '' },
    lowIncomeFamilyId: { type: String, default: '' },
    paymentAmount: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    status: { type: String, default: '' },
    typeOfPayment: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('LowIncomePayments', LowIncomePaymentsSchema);
