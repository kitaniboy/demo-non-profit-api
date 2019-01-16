const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const familyAddressSchema = require('./familyAddress');
const husbandSchema = require('./husband');
const wifeSchema = require('./wife');
const guardianSchema = require('./guardian');
const relativeSchema = require('./relative');
const incomeSchema = require('./income');
const livingConditionSchema = require('./livingCondition');
const possessionsSchema = require('./possessions');
const loanSchema = require('./loan');
const familyMembersSchema = require('./familyMembers');

const familySchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // document id
  familyID: { type: String, unique: true }, // family id
  archived: { type: Boolean, default: false },
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
  children: [familyAddressSchema, husbandSchema, wifeSchema, familyMembersSchema, guardianSchema, relativeSchema, incomeSchema, livingConditionSchema, possessionsSchema, loanSchema], // change to Archived
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