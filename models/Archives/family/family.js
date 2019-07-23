const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accommodationStatusSchema = require('./accommodationStatus')
const familyAddressSchema = require('./familyAddress')
const familyCategorySchema = require('./familyCategory')
const guardianSchema = require('./guardian')
const homeDetailsSchema = require('./homeDetails')
const husbandSchema = require('./husband')
const incomeSchema = require('./income')
const livingConditionSchema = require('./livingCondition')
const loanSchema = require('./loan')
const possessionsSchema = require('./possessions')
const relativeSchema = require('./relative')
const wifeSchema = require('./wife')
const ramadanSchema = require('./ramadan')
const eidAlAdhaSchema = require('./eidAlAdha')

const familySchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId }, // document id
    accommodationStatus: [accommodationStatusSchema],
    familyAddress: [familyAddressSchema],
    familyCategory: [familyCategorySchema],
    guardian: [guardianSchema],
    homeDetails: [homeDetailsSchema],
    husband: [husbandSchema],
    income: [incomeSchema],
    livingCondition: [livingConditionSchema],
    loan: [loanSchema],
    possessions: [possessionsSchema],
    relative: [relativeSchema],
    wife: [wifeSchema],
    ramadan: [ramadanSchema],
    eidAlAdha: [eidAlAdhaSchema],
    visitReports: { type: String, default: '' },
    numberOfFamilyMembers: { type: String, default: '0' },
    formId: { type: String, default: '0' },
    familyId: { type: String, default: '0' },
    claimMadeBy: { type: String, default: '' },
    dateOfCaseStudy: { type: String, default: '' },
    typeOfAssistanceNeeded: { type: String, default: '' },
    notes: { type: String, default: '' },
    sourceOfCase: { type: String, default: '' },
    dateOfLetter: { type: String, default: '' },
    phone: { type: String, default: '' },
    isArchived: { type: Boolean, default: false },
    reasonForArchiving: { type: String, default: '' },
    dateOfArchiving: { type: String, default: '' },
    numberOfResidenceInHouseHold: { type: String, default: '' },
    maleUnemployedAdultChildren: { type: String, default: '' },
    femaleUnemployedAdultChildren: { type: String, default: '' },
    numberOfChildrenInElementary: { type: String, default: '' },
    numberOfChildrenInSecondary: { type: String, default: '' },
    numberOfChildrenInHighSchool: { type: String, default: '' },
    numberOfChildrenInHigherEducation: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateOfUpdate: { type: String, default: '' },
    isWaitList: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isRamadan: { type: Boolean, default: false },
    isEidAlAdha: { type: Boolean, default: false },
    finalNotes: { type: String, default: '' },
    signature: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('Family', familySchema)
