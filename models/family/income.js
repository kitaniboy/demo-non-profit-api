const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  salary: { type: Number },
  retirementSalary: { type: Number },
  socialSecuritySalary: { type: Number },
  alrahmaSalary: { type: Number },
  darAlataaSalary: { type: Number },
  bahwanSalary: { type: Number },
  other: {
    source: String,
    amount: Number
  },
  expenses: { type: Number }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Income', incomeSchema);