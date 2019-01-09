const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteVisitSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // site visit id
  familyID: { type: String, unique: true }, // this will connect this to family schema
  detailedAddress: { type: String }, // should I get the address from visit data?
  fieldAgentName: { type: String },
  fieldAgentPhone: { type: String },
  assistanceCategory: { type: String },
  activeCase: { type: Boolean, default: true },
  DateOfVisit: { type: Date },
  AgentReport: { type: String },
  AgentSuggestion: { type: String },
  caseMovedTo: { type: String }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('SiteVisit', siteVisitSchema);