const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilyMembersSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  familyMemberId: { type: String, default: ''},
  familyId: { type: String, default: '' },
  familyMemberName: { type: String, default: '' },
  relation: { type: String, default: '' },
  socialStatus:  { type: String, default: '' },
  dateOfBirth: { type: String, default: ''},
  educationLevel:   { type: String, default: '' },
  job: { type: String, default: '' },
  workPlace: { type: String, default: '' },
  familyMemberSalary: { type: String, default: '' },
  familyMemberLoan: { type: String, default: '' },
  monthlyInstallment: { type: String, default: '' },
  loanReason: { type: String, default: '' },
  health: { type: String, default: '' },
  retirementSalary: { type: String, default: '' },
  age: { type: String, default: '' }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('FamilyMembers', FamilyMembersSchema);
