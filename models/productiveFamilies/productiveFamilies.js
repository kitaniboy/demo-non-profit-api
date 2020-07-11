const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
TRANSLATION
==============================================
 familyId: رقم الاسرة
 educationLevel: المؤهل العلمي
 CollegeMajor: التخصص
 maritalStatus: الحالة الاجتماعية
 nationality: الجنسية
 mainPhoneNumber: رقم الجوال الاساسي
 secondaryPhoneNumber: رقم الجوال الثانوي
 product: منتج
 service: خدمة
 jobHunting: باحث عن عمل
 employedByAlRahma: موظف عن طريق الجمعية
 employedBySelfEffort: موظف بجهد ذاتي

 productName: اسم المشروع
 productCategory: نوع الحرفة او المنتج
 productYearsOfExperience: سنوات الخبرة في المجال
 productInstagramAccount: الانستجرام
 productDescription: وصف المنتج
 isProductMainSourceOfIncome: هل تعتمد عليه كمصدر دخل؟
 howIsProductWorkPerformed: كيف تقوم بإنجازها؟
 otherWayProductWorkIsPerformed: أخرى
 productMarketingLocation: مكان تسويق المنتج
 otherProductMarketingLocation: أخرى
 didTrainingProgramForProduct: هل سبق وحصلت على دورة تدريبة؟
 productTrainingProgramName: اسم الدورات
 productChallengesFaced: ما هي الصعوبات التي تواجهك؟
 otherProductChallenges: أخرى
 productQuality: مستوى المنتج
 supportNeededForProduct: المتطلبات والاحتياجات
 typeOfTrainingNeededForProduct: نوع التدريب و التطوير
 productSupportGiven: الدعم المقدم
 dateOfSupportForProduct: التاريخ
 productSupportDetails: تفاصيل الدعم
 productSupportComments: التعليق

 serviceName: اسم المشروع
 serviceCategory: نوع الخدمة
 serviceYearsOfExperience: سنوات الخبرة في المجال
 serviceInstagramAccount: الانستجرام
 serviceDescription: وصف الخدمة
 isServiceMainSourceOfIncome: هل تعتمد عليه كمصدر دخل؟
 howIsServiceWorkPerformed: كيف تقوم بإنجازها؟
 otherWayServiceWorkIsPerformed: أخرى
 serviceMarketingLocation: مكان تسويق المنتج
 otherServiceMarketingLocation: أخرى
 didTrainingProgramForService: هل سبق وحصلت على دورة تدريبة؟
 serviceTrainingProgramName: اسم الدورات
 serviceChallengesFaced: ما هي الصعوبات التي تواجهك؟
 otherServiceChallenges: أخرى
 serviceQuality: مستوى الخدمة
 supportNeededForService: المتطلبات والاحتياجات
 typeOfTrainingNeededForService: نوع التدريب و التطوير
 serviceSupportGiven: الدعم المقدم
 dateOfSupportForService: التاريخ
 serviceSupportDetails: تفاصيل الدعم
 serviceSupportComments: التعليق

 previousJob: العمل السابق
 currentCompany: جهة العمل الحالية
 currentJob: الوظيفة الحالية
 salary: الراتب
 startDateJobHunting: الفترة من
 endDateJobHunting: الفترة الى
 reasonForLeavingJob: سبب ترك الوظيفة
 yearsOfExperienceAtJob: عدد سنوات الخبرة
 jobDuties: المهام الوظيفية
 wantsToWorkInKafaf: هل ترغب في العمل في مشروع كفاف؟
 jobStatus: الحالة
 personalSkills: المهارات الشخصية
 interest: الميول
 languagesSpoken: اللغات التي تتحدثها
 preferredJob: الوظائف المفضلة للالتحاق
 otherPreferredJob: أخرى
 serviceSupportComments: التعليق

 kafafPositionName: المسمى الوظيفي
 typeOfKafafWorkshop: نوع الورشة
 kafafJobSalary: الراتب
 startDateKafaf: الفترة من
 endDateJobKafaf: الفترة الى
 otherPositionName: المسمى الوظيفي
 otherCompany: الجهة
 otherDepartment: القسم
 otherSalary: الراتب
 startDateOther: الفترة من
 endDateJobOther: الفترة الى
 alrahmaJobComments: التعليق

 companyBySelfEffort: الجهة
 jobBySelfEffort: نوع الوظيفة
 dateOfStartinSelfEffortJob: تاريخ الالتحاق
 salaryBySelfEffort: الراتب
 EmployedBySelfEffortcomments: التعليق

 dateOfContact: التاريخ
 detailsOfContact: تفاصيل التواصل
 dateOfAssistanseRequest: التاريخ
 detailsOfAssitanceRequest: تفاصيل الطلب

==============================================
*/

const productiveFamilySchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    // productiveFamilyMemberId: {
    //   type: String,
    //   default: '',
    //   index: { unique: true }
    // },
    familyId: { type: String, default: '' },
    familyMemberData: [{ type: Schema.Types.ObjectId, ref: 'FamilyMembers' }],

    educationLevel: { type: String, default: '' },
    CollegeMajor: { type: String, default: '' },
    maritalStatus: { type: String, default: '' },
    nationality: { type: String, default: '' },
    mainPhoneNumber: { type: String, default: '' },
    secondaryPhoneNumber: { type: String, default: '' },

    product: { type: Boolean, default: false },
    service: { type: Boolean, default: false },
    jobHunting: { type: Boolean, default: false },
    employedByAlRahma: { type: Boolean, default: false },
    employedBySelfEffort: { type: Boolean, default: false },

    productName: { type: String, default: '' },
    productCategory: { type: String, default: '' },
    productYearsOfExperience: { type: String, default: '' },
    productInstagramAccount: { type: String, default: '' },
    productDescription: { type: String, default: '' },
    isProductMainSourceOfIncome: { type: String, default: '' },
    howIsProductWorkPerformed: { type: String, default: '' },
    otherWayProductWorkIsPerformed: { type: String, default: '' },
    productMarketingLocation: { type: String, default: '' },
    otherProductMarketingLocation: { type: String, default: '' },
    didTrainingProgramForProduct: { type: String, default: '' },
    productTrainingProgramName: { type: String, default: '' },
    productChallengesFaced: { type: String, default: '' },
    otherProductChallenges: { type: String, default: '' },
    productQuality: { type: String, default: '' },
    supportNeededForProduct: { type: String, default: '' },
    typeOfTrainingNeededForProduct: { type: String, default: '' },
    productSupportGiven: { type: String, default: '' },
    dateOfSupportForProduct: { type: String, default: '' },
    productSupportDetails: { type: String, default: '' },
    productSupportComments: { type: String, default: '' },

    serviceName: { type: String, default: '' },
    serviceCategory: { type: String, default: '' },
    serviceYearsOfExperience: { type: String, default: '' },
    serviceInstagramAccount: { type: String, default: '' },
    serviceDescription: { type: String, default: '' },
    isServiceMainSourceOfIncome: { type: String, default: '' },
    howIsServiceWorkPerformed: { type: String, default: '' },
    otherWayServiceWorkIsPerformed: { type: String, default: '' },
    serviceMarketingLocation: { type: String, default: '' },
    otherServiceMarketingLocation: { type: String, default: '' },
    didTrainingProgramForService: { type: String, default: '' },
    serviceTrainingProgramName: { type: String, default: '' },
    serviceChallengesFaced: { type: String, default: '' },
    otherServiceChallenges: { type: String, default: '' },
    serviceQuality: { type: String, default: '' },
    supportNeededForService: { type: String, default: '' },
    typeOfTrainingNeededForService: { type: String, default: '' },
    serviceSupportGiven: { type: String, default: '' },
    dateOfSupportForService: { type: String, default: '' },
    serviceSupportDetails: { type: String, default: '' },
    serviceSupportComments: { type: String, default: '' },

    previousJob: { type: String, default: '' },
    currentCompany: { type: String, default: '' },
    currentJob: { type: String, default: '' },
    salary: { type: String, default: '' },
    startDateJobHunting: { type: String, default: '' },
    endDateJobHunting: { type: String, default: '' },
    reasonForLeavingJob: { type: String, default: '' },
    yearsOfExperienceAtJob: { type: String, default: '' },
    jobDuties: { type: String, default: '' },
    wantsToWorkInKafaf: { type: String, default: '' },
    jobStatus: { type: String, default: '' },
    personalSkills: { type: String, default: '' },
    interest: { type: String, default: '' },
    languagesSpoken: { type: String, default: '' },
    preferredJob: { type: String, default: '' },
    otherPreferredJob: { type: String, default: '' },
    jobHuntingComments: { type: String, default: '' },

    kafafPositionName: { type: String, default: '' },
    typeOfKafafWorkshop: { type: String, default: '' },
    kafafJobSalary: { type: String, default: '' },
    startDateKafaf: { type: String, default: '' },
    endDateJobKafaf: { type: String, default: '' },
    otherPositionName: { type: String, default: '' },
    otherCompany: { type: String, default: '' },
    otherDepartment: { type: String, default: '' },
    otherSalary: { type: String, default: '' },
    startDateOther: { type: String, default: '' },
    endDateJobOther: { type: String, default: '' },
    alrahmaJobComments: { type: String, default: '' },

    companyBySelfEffort: { type: String, default: '' },
    jobBySelfEffort: { type: String, default: '' },
    dateOfStartInSelfEffortJob: { type: String, default: '' },
    salaryBySelfEffort: { type: String, default: '' },
    EmployedBySelfEffortComments: { type: String, default: '' },

    dateOfContact: { type: String, default: '' },
    detailsOfContact: { type: String, default: '' },
    dateOfAssistanceRequest: { type: String, default: '' },
    detailsOfAssistanceRequest: { type: String, default: '' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    // strict: false
  }
)

module.exports = mongoose.model('ProductiveFamily', productiveFamilySchema)
