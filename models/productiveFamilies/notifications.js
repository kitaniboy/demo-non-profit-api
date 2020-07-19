const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
TRANSLATION
==============================================
 notificationId: رقم التسلسل
 message: الرسالة
 familyMemberId: رقم الفرد
 familyId: رقم الاسرة
 isClosed: تم التعامل؟
 dateTime: الزقت و التاريخ,
 enteredBy: تم التحديث بواسطة

==============================================
*/

const notificationsSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    message: { type: String, default: '' },
    familyMemberId: { type: String, default: '' },
    familyId: { type: String, default: '' },
    isClosed: { type: String, default: 'لا' },
    dateTime: { type: Date, default: new Date() },
    enteredBy: { type: String, default: '' }
  }
  //   {
  //     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  //     // strict: false
  //   }
)

module.exports = mongoose.model('Notifications', notificationsSchema)
