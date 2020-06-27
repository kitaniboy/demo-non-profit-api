const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wifeSchema = new Schema(
  {
    wifeName: { type: String, default: '' },
    wifeIsWorking: { type: Boolean, default: false },
    wifeNationality: { type: String, default: '' },
    wifeCivilId: { type: String, default: '' },
    wifePhone: { type: String, default: '' },
    isHouseWife: { type: Boolean, default: false },
    wifeIsRetired: { type: Boolean, default: false },
    wifeIsWidow: { type: Boolean, default: false },
    wifeIsAbandoned: { type: Boolean, default: false },
    wifeIsDisabled: { type: Boolean, default: false },
    wifeIsSick: { type: Boolean, default: false },
    wifeIsDeceased: { type: Boolean, default: false },
    wifeIsDivorced: { type: Boolean, default: false },
    wifeJob: { type: String, default: '' },
    wifeWorksAt: { type: String, default: '' },
    wifeSalary: { type: String, default: '' },
    wifeRetiredFrom: { type: String, default: '' },
    wifeRetirementSalary: { type: String, default: '' },
    dateOfDivorce: { type: String, default: '' },
    wifeBankNumber: { type: String, default: '' }
    // isProductiveFamily: { type: Boolean, default: false },
    // typeOfProductiveFamily: { type: String, default: '' },
  },
  { _id: false }
)

// module.exports = mongoose.model('Wife', wifeSchema);
module.exports = wifeSchema
