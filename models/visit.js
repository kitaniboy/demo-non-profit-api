const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // visit ID
  familyID: { type: String, unique: true }, // type: Schema.Types.ObjectId, ref: '<FamilyID from family schema>'
  visitorName:  { type: String },
  visitorPhone: { type: String, max: 10},
  address:   { type: String },
  purposeOfVisit: { type: String }, // case
  response: { type: String },
  caseAgent: { type: String }, // who will handle it?
  caseCategory: { type: String },
  documentsMissing: { type: String },
  date: { type: Date, default: Date.now },
}, { collation: { locale: 'ar'} });

module.exports = mongoose.model('Visit', visitSchema);