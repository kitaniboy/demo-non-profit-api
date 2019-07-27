const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    familyId: { type: String, default: '' },
    assistanceId: { type: String, default: '' },
    assistanceCategory: { type: String, default: '' },
    supportNeeded: {
      description: { type: String, default: '' },
      exchange: { type: String, default: '' },
      new: { type: String, default: '' },
      count: { type: String, default: '' },
      date: { type: String, default: '' }
    },
    supportGiven: {
      description: { type: String, default: '' },
      exchange: { type: String, default: '' },
      new: { type: String, default: '' },
      count: { type: String, default: '' },
      date: { type: String, default: '' }
    },
    department: { type: String, default: '' },
    receiptDate: { type: String, default: '' },
    cost: { type: String, default: '' },
    agreementGivenBy: { type: String, default: '' },
    dateOfAgreement: { type: String, default: '' } // who will handle it?
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('Donations', donationSchema)
