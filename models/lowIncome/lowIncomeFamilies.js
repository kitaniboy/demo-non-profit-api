const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LowIncomeFamiliesSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  formId: { type: String, default: '' },
  lowIncomeFamilyId: { type: String, default: '' },
  familyCategory: { type: String, default: '' },
  husbandName: { type: String, default: '' },
  husbandPhone: { type: String, default: '' },
  wifeName: { type: String, default: '' },
  wifePhone: { type: String, default: '' },
  address: {
    area: { type: String, default: '' },
    neighborhood: { type: String, default: '' },
  },
  typeOfAccommodation: { type: String, default: '' },
  rentAmount: { type: String, default: '' },
  sponsorId: { type: String, default: '' },
  sponsorAmount: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  numberOfKidsInSchool: { type: String, default: '' },
  totalIncome: { type: String, default: '' },
  totalLoan: { type: String, default: '' },
  monthlyPayment: { type: String, default: '' },
  shoppingCenterName: { type: String, default: '' },
  notes: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('LowIncomeFamilies', LowIncomeFamiliesSchema);
