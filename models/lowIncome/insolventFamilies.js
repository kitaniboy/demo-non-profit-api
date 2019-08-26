const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
TRANSLATION
==============================================
 familyCategory: فئة الاسرة
 formId: رقم الارشفة
 lowIncomeFamilyId: رقم الاسرة المعسرة
 sponsorId: رقم الكفيل
 sponsorAmount: مبلغ الكفالة
 sponsorshipStartDate: تاريخ الكفالة
 sponsorshipEndDate: تاريخ انتهاء الكفالة
 shoppingCenterName: اسم المركز
 notes: الملاحظات
 isActive: فعال
==============================================
*/

const InsolventFamiliesSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    formId: { type: String, default: '' },
    lowIncomeFamilyId: { type: String, default: '' },
    // familyCategory: { type: String, default: '' },
    sponsorId: { type: String, default: '' },
    sponsorAmount: { type: String, default: '' },
    sponsorshipStartDate: { type: String, default: '' },
    sponsorshipEndDate: { type: String, default: '' },
    shoppingCenterName: { type: String, default: '' },
    notes: { type: String, default: '' },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('InsolventFamilies', InsolventFamiliesSchema)

// husbandName: { type: String, default: '' },
// husbandPhone: { type: String, default: '' },
// wifeName: { type: String, default: '' },
// wifePhone: { type: String, default: '' },

// const accommodationStatusSchema = new Schema({
//   owned: { type: Boolean, default: false },
//   inherited: { type: Boolean, default: false },
//   combined: { type: Boolean, default: false },
//   rent: { type: Boolean, default: false },
//   rentAmount: { type: String, default: '' },
//   lateRentAmount: { type: String, default: '' },
//   lateElectricalAmount: { type: String, default: '' },
//   lateWaterAmount: { type: String, default: '' },
// },{ _id : false });

// const livingConditionSchema = new Schema({
//     oneStoryHouse: { type: Boolean, default: false },
//     twoStoryHouse: { type: Boolean, default: false },
//     apartment: { type: Boolean, default: false },
//     addition: { type: Boolean, default: false },
//     otherAccommodation: { type: String, default: '' }
//   },{ _id : false });

// const familyAddressSchema = new Schema({
//   governorate: { type: String, default: ''  },
//   state: { type: String, default: ''  },
//   town: { type: String, default: ''  },
//   neighborhood: { type: String, default: '' }
// }, { _id : false });

// numberOfChildrenInElementary: { type: String, default: '' },
// numberOfChildrenInSecondary: { type: String, default: '' },
// numberOfChildrenInHighSchool: { type: String, default: '' },

// const incomeSchema = new Schema({
//   salary: { type: String, default: '0' },
//   retirementSalary: { type: String, default: '0' },
//   socialSecuritySalary: { type: String, default: '0' },
//   alrahmaSalary: { type: String, default: '0' },
//   darAlataaSalary: { type: String, default: '0' },
//   nafaqaSalary: { type: String, default: '0' },
//   bahwanSalary: { type: String, default: '0' },
//   otherSalary: { type: String, default: '0' }
// },{ _id : false });

// const loanSchema = new Schema({
//   housingLoaner: { type: String, default: '' },
//   housingLoanAmount: { type: String, default: '' },
//   housingLoanMonthlyPayments: { type: String, default: '' },
//   housingLoanAmountDue: { type: String, default: '' },
//   personalLoaner: { type: String, default: '' },
//   personalLoanAmount: { type: String, default: '' },
//   personalLoanMonthlyPayments: { type: String, default: '' },
//   personalLoanAmountDue: { type: String, default: '' },
//   vehicleLoaner: { type: String, default: '' },
//   vehicleLoanAmount: { type: String, default: '' },
//   vehicleLoanMonthlyPayments: { type: String, default: '' },
//   vehicleLoanAmountDue: { type: String, default: '' },
// },{ _id : false });

// const familyCategorySchema = new Schema({
//   orphan: { type: Boolean, default: false },
//   limitedIncome: { type: Boolean, default: false },
//   socialSecurity: { type: Boolean, default: false },
//   financialIssues: {type: Boolean, default: false }, // عجز
//   isOther: { type: Boolean, default: false },
//   other: { type: String, default: ''}
// }, { _id : false });
