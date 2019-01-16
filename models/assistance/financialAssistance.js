const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialAssistanceSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // visit ID
  familyID: { type: Schema.Types.ObjectId, unique: true, ref: 'Family' },
  assistanceCategory: { type: String },
  amount: { type: Number },
  start: { type: Date },
  end: { type: Date },
  nameOfRecipient: { type: String }, // comes from famliy ID
  civilID: { type: String },// comes from famliy ID
  phone: {type: String },// comes from famliy ID
  reasonForSupportStopping: { type: String },
  orderedBy: { type: String }, // who decided to stop
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('FinancialAssistance', financialAssistanceSchema);