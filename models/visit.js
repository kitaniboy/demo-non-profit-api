const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  id: {type: Schema.Types.ObjectId}, // visit ID
  familyID: {type: String}, // type: Schema.Types.ObjectId, ref: '<FamilyID from family schema>'
  visitorName:  String,
  visitorPhone: String,
  address:   String,
  purposeOfVisit: String, // case
  response: String,
  caseAgent: String, // who will handle it?
  caseCategory: String,
  documentsMissing: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visit', visitSchema);