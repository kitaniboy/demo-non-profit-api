const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
TRANSLATION
==============================================
 formId: رقم الارشفة
 nameOfRecipient: اسم الباحث عن عمل 
 dateOfContact: تاريخ التواصل 
 formOfContact: طريقة التواصل
 relationship:علاقة المستفيد بالاسم الرمجعي
 ageOfRecipient:العمر 
 notes:ملاحظات 
 fieldOfWork:المجال- كفاف 
 recipientEducationLevel:المستوى الدراسي 
 recipientNationalId:الرقم المدني 
 reasonForNotRegistering: سبب عدم الرغبة في التسجيل /كفاف
 phoneNumberOfRecipient:رقم الهاتف 
 isRegistered: كفاف ( يرغب/لا يرغب)
 reasonForContact: تفاصيل التواصل 
  status:حالة الفرد 
  workExperience:خبرات العمل
==============================================
*/

const productiveFamilySchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    formId: { type: String, default: '' },
    nameOfRecipient: { type: String, default: '' },
    relationship: { type: String, default: '' },
    ageOfRecipient: { type: String, default: '' },
    recipientNationalId: { type: String, default: '' },
    recipientEducationLevel: { type: String, default: '' },
    fieldOfWork: { type: String, default: '' },
    formOfContact: { type: String, default: '' },
    dateOfContact: { type: String, default: '' },
    reasonForNotRegistering: { type: String, default: '' },
    phoneNumberOfRecipient: { type: String, default: '' },
    isRegistered: { type: String, default: '' },
    reasonForContact: { type: String, default: '' },
    status: { type: String, default: '' },
    workExperience: { type: String, default: '' }
  }
  //   {
  //     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  //     strict: false
  //   }
)

module.exports = mongoose.model('ProductiveFamily', productiveFamilySchema)
