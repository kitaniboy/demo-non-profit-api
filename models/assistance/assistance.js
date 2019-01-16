const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assistanceSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // visit ID
  familyID: { type: Schema.Types.ObjectId, unique: true, ref: 'Family' },
  assistanceCategory:  { type: String },
  supportNeeded: {
    description: { type: String },
    exchange: { type: String },
    new: { type: String },
    count: { type: Number },
    date: { type: Date }
  },
  supportGiven: {
    description: { type: String },
    exchange: { type: String },
    new: { type: String },
    count: { type: Number },
    date: { type: Date }
  },
  department:   { type: String },
  receiptDate: { type: Date }, // case
  agreementGivenBy: { type: String },
  dateOfAgreement: { type: Date }, // who will handle it?
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Assistance', assistanceSchema);