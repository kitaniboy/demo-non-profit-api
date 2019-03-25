const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitReportsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  report: { type: String, default: '' },
  suggestions: { type: String, default: '' },
  fieldAgentName: { type: String, default: '' },
  fieldAgentPhone: { type: String, default: '' },
  dateOfReport: { type: String, default: '' },
  panelRecFirst: { type: String, default: '' },
  panelRecSecond: { type: String, default: '' },
  panelRecThird: { type: String, default: '' },
  panelRecFourth: { type: String, default: '' },
  panelRecFifth: { type: String, default: '' },
  panelRecSixth: { type: String, default: '' },
  familyId: { type: String, default: ''}
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('VisitReports', visitReportsSchema);
// module.exports = visitReportsSchema;
