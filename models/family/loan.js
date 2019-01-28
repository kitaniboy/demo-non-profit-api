const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  housingLoaner: { type: String, default: '' },
  housingLoanAmount: { type: String, default: '' },
  housingLoanMonthlyPayments: { type: String, default: '' },
  housingLoanAmountDue: { type: String, default: '' },
  personalLoaner: { type: String, default: '' },
  personalLoanAmount: { type: String, default: '' },
  personalLoanMonthlyPayments: { type: String, default: '' },
  personalLoanAmountDue: { type: String, default: '' },
  vehicleLoaner: { type: String, default: '' },
  vehicleLoanAmount: { type: String, default: '' },
  vehicleLoanMonthlyPayments: { type: String, default: '' },
  vehicleLoanAmountDue: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('Loan', loanSchema);
module.exports = loanSchema;