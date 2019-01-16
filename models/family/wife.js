const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wifeSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String },
  nationality: { type: String },
  civilID: { type: String },
  phone: { type: String },
  status: {
    working: { type: Boolean },
    housewife: { type: Boolean },
    retired: { type: Boolean },
    unemployed: { type: Boolean },
    incarcerated: { type: Boolean },
    widowed: { type: Boolean },
    divorced: { type: Boolean },
    disabled: { type: Boolean },
    sick: { type: Boolean },
    diseased: { type: Boolean },
    other: { type: String }
  },
  occupation: { type: String },
  workplace: { type: String },
  salary: { type: String },
  retirementAuthority: { type: String },
  retirementSalary: { type: String },
  dateOfDivorce: { type: Date },
  bankAccountNumber: { type: Number }, // why???
  isProductiveFamily: { type: Boolean },
  typeOfProductiveFamilyJob: { type: String }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Wife', wifeSchema);