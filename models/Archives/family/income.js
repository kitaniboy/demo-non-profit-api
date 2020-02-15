const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  salary: { type: String, default: '0' },
  retirementSalary: { type: String, default: '0' },
  socialSecuritySalary: { type: String, default: '0' },
  alrahmaSalary: { type: String, default: '0' },
  darAlataaSalary: { type: String, default: '0' },
  nafaqaSalary: { type: String, default: '0' },
  bahwanSalary: { type: String, default: '0' },
  omanCharityOrgSalary: { type: String, default: '0' },
  otherSalary: { type: String, default: '0' }
},{ _id : false });

// module.exports = mongoose.model('Income', incomeSchema);
module.exports = incomeSchema;