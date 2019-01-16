const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  housing: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  },
  personal: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  },
  vehicle: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Loan', loanSchema);