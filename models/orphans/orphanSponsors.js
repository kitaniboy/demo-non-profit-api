const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrphanSponsorsSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    sponsorId: { type: String, default: '', index: true },
    sponsorName: { type: String, default: '' },
    sponsorNationality: { type: String, default: '' },
    sponsorEmail: { type: String, default: '' },
    sponsorPhone: { type: String, default: '' },
    numberOfSponsored: { type: String, default: '' },
    sponsorAmount: { type: String, default: '' },
    paymentMethod: { type: String, default: '' },
    dateOfForm: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    bondNumber: { type: String, default: '' }, // رقم السند
    bondDate: { type: String, default: '' },
    sponsorStatus: { type: String, default: '' },
    sponsorBankAccountNum: { type: String, default: '' },
    sponsorBank: { type: String, default: '' },
    notes: { type: String, default: '' },
    hasSponsorship: { type: Boolean, default: false },
    hasPayments: { type: Boolean, default: false },
    hasPaidThisMonth: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('OrphanSponsors', OrphanSponsorsSchema)
