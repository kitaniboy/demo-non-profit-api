const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const husbandSchema = new Schema({
  husbandName: { type: String, default: '' },
  husbandNationality: { type: String, default: '' },
  husbandCivilId: { type: String, default: '' },
  husbandPhone: { type: String, default: '' },
  husbandIsWorking: { type: Boolean, default: false },
  husbandIsRetired: { type: Boolean, default: false },
  husbandIsUnemployed: { type: Boolean, default: false },
  husbandIsIncarcerated: { type: Boolean, default: false },
  husbandIsDisabled: { type: Boolean, default: false },
  husbandIsSick: { type: Boolean, default: false },
  husbandIsDeceased: { type: Boolean, default: false },
  OtherHusbandStatus: { type: String, default: '' },
  husbandWorksAt: { type: String, default: '' },
  husbandJob: { type: String, default: '' },
  husbandSalary: { type: String, default: '' },
  husbandRetiredFrom: { type: String, default: '' },
  husbandRetirementSalary: { type: String, default: '' },
  husbandNumberOfWives: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('Husband', husbandSchema);
module.exports = husbandSchema;