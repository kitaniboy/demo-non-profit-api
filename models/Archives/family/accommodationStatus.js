const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodationStatusSchema = new Schema({
  owned: { type: Boolean, default: false },
  inherited: { type: Boolean, default: false },
  combined: { type: Boolean, default: false },
  rent: { type: Boolean, default: false },
  rentAmount: { type: String, default: '' },
  lateRentAmount: { type: String, default: '' },
  lateElectricalAmount: { type: String, default: '' },
  lateWaterAmount: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('FamilyAddress', familyAddressSchema);
module.exports = accommodationStatusSchema;