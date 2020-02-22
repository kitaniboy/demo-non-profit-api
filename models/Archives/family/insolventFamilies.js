const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
TRANSLATION
==============================================
 insolventFamilyId: رقم الاسرة المعسرة
 insolventFamilyNotes: ملاحظات
==============================================
*/

const insolventFamiliesSchema = new Schema(
  {
    insolventFamilyId: { type: String, default: '' },
    insolventFamilyNotes: { type: String, default: '' },
    insolventFamilyIsActive: { type: Boolean, default: true }
  },
  { _id: false }
)

module.exports = insolventFamiliesSchema
