const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyAddressSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  governorate: { type: String },
  state: { type: String },
  town: { type: String },
  neighborhood: { type: String }
});

const husbandSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String },
  nationality: { type: String },
  civilID: { type: String },
  phone: { type: String },
  status: {
    working: { type: Boolean },
    retired: { type: Boolean },
    unemployed: { type: Boolean },
    incarcerated: { type: Boolean },
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
  numberOfWives: { type: Number }
});

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
});

const guardianSchema = new Schema({
  name: { type: String },
  civilID: { type: String },
  phone: { type: String },
  relation: { type: String },
}, { _id: false });

const relativeSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  relation: { type: String },
}, { _id: false });

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
}, { _id: false });

const livingConditionSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  accommodation: {
    oneStoryHouse: { type: Boolean },
    twoStoryHouse: { type: Boolean },
    apartment: { type: Boolean },
    addition: { type: Boolean },
    other: { type: String }
  },
  accommodationStatus: {
    owned: { type: Boolean },
    inherited: { type: Boolean },
    combined: { type: Boolean },
    rent: {
      amount: { type: Number },
      status: { type: Boolean }
    },
  },
  latePayments: {
    rent: { type: Number },
    electrical: { type: Number },
    water: { type: Number },
  },
  homeDetails: {
    numberOfRooms: { type: Number },
    numberOfLivingRooms: { type: Number },
    numberOfSittingRooms: { type: Number },
    numberOfKitchens: { type: Number },
    numberOfBathrooms: { type: Number },
  }
});

const possessionsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  privateVehicles: { type: Number },
  rentalVehicles: { type: Number },
  schoolBus: { type: Number },
  gasTruck: { type: Number },
  waterTruck: { type: Number },
  other: {
    item: { type: String },
    number: { type: Number }
  }
});

const loanSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  housing: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  },
  personal: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  },
  vehicle: {
    loaner: { type: String },
    amount: { type: Number },
    monthlyPayments: { type: Number },
    amountDue: { type: Number }
  }
});

const familySchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // document id
  familyID: { type: String, unique: true }, // family id
  familyCategory: { // OR STATUS?
    orphan: { type: Boolean, default: false },
    limitedIncome: { type: Boolean, default: false },
    socialSecurity: { type: Boolean, default: false },
    other: { type: String }
  },
  claimMadeBy: { type: String }, // person who made the claim
  dateOfCaseStudy: { type: String },
  typeOfAssistanceNeeded: { type: String },
  notes: { type: String },
  caseActive: { type: Boolean, default: true },
  children: [familyAddressSchema, husbandSchema, wifeSchema, guardianSchema, relativeSchema, incomeSchema, livingConditionSchema, possessionsSchema, loanSchema], // change to Archived
  numberOfResidenceInHouseHold: { type: Number },
  numberOfUnemployedAdultChildren: {
    male: { type: Number },
    female: { type: Number }
  },
  numberOfChildrenPerSchoolPhase: {
    elementary: { type: Number },
    secondary: { type: Number },
    highSchool: { type: Number },
    higherEducation: { type: Number }
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}, collation: { strength: 2 }});

module.exports = mongoose.model('Family', familySchema);