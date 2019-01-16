const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteVisitsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  family: {
    familyId: { type: String },
    address: { type: String },
    assistanceCategory: { type: String },
  },
  agent: {
    name: { type: String },
    phone: { type: String },
    dateOfVisit: { type: String },
    report: { type: String },
    recommendation: { type: String }
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('SiteVisits', siteVisitsSchema);
