const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  familyName: { type: String, default: '' },
  formId: { type: String, default: '' },
  familyId:  { type: String, default: '' },
  recipientName:   { type: String, default: '' },
  department: { type: String, default: '' },
  dateOfBorrow: { type: String, default: '' },
  nameOfEmployee: { type: String, default: '' },
  dateOfReturn: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Borrow', borrowSchema);