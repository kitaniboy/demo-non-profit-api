const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyMembersSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String },
  relation: { type: String },
  maritalStatus: { type: String },
  dateOfBirth: { type: Date },
  educationLevel: { type: String },
  occupation: { type: String },
  companyName: { type: String },
  salary: { type: String },
  health: { type: String }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('FamilyMembers', familyMembersSchema);