const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productiveFamilySchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    formId: { type: String, default: '' },
    nameOfRecipient: { type: String, default: '' },
    relationship: { type: String, default: '' },
    ageOfRecipient: { type: String, default: '' },
    RecipientNationalId: { type: String, default: '' },
    RecipientEducationLevel: { type: String, default: '' },
    fieldOfWork: { type: String, default: '' },
    formOfContact: { type: String, default: '' },
    dateOfContact: { type: String, default: '' },
    reasonForNotRegistering: { type: String, default: '' }
  }
  //   {
  //     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  //     strict: false
  //   }
)

module.exports = mongoose.model('ProductiveFamily', productiveFamilySchema)
