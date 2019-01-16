const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceptionsSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // visit ID
  familyId: { type: String, default: 'جديد' },
  visitorName:  { type: String, default: '' },
  visitorPhone: { type: String, default: ''},
  address:   { type: String, default: '' },
  purposeOfVisit: { type: String, default: '' }, // case
  response: { type: String, default: '' },
  caseAgent: { type: String, default: '' }, // who will handle it?
  caseCategory: { type: String, default: '' },
  documentsMissing: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Receptions', ReceptionsSchema);

/*
This schema records all information related to family visits.
Receptionist should:
1- check if family is new or old
2- if old find fam ID
3- add visit info
4- get family documents
*/