const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  salary: { type: String, default: '' },
  retirementSalary: { type: String, default: '' },
  socialSecuritySalary: { type: String, default: '' },
  alrahmaSalary: { type: String, default: '' },
  darAlataaSalary: { type: String, default: '' },
  nafaqaSalary: { type: String, default: '' },
  bahwanSalary: { type: String, default: '' },
  otherSalary: { type: String, default: '' }
},{ _id : false });

// module.exports = mongoose.model('Income', incomeSchema);
module.exports = incomeSchema;