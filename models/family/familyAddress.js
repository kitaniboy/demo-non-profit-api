const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyAddressSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  governorate: { type: String },
  state: { type: String },
  town: { type: String },
  neighborhood: { type: String }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('FamilyAddress', familyAddressSchema);