const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyCategorySchema = new Schema({
  orphan: { type: Boolean, default: false },
  limitedIncome: { type: Boolean, default: false },
  socialSecurity: { type: Boolean, default: false },
  financialIssues: {type: Boolean, default: false }, // عجز
  isOther: { type: Boolean, default: false },
  other: { type: String, default: ''}
}, { _id : false });

// module.exports = mongoose.model('FamilyCategory', familyCategorySchema);

module.exports = familyCategorySchema;