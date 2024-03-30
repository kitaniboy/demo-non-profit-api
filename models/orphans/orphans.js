const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphansSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  orphanId: { type: String, default: '', index: true },
  orphanFamilyId: { type: String, default: '' },
  sponsorId: { type: String, default: '', index: true },
  orphanName: { type: String, default: '' },
  orphanSex: { type: String, default: '' },
  orphanNationality: { type: String, default: '' },
  orphanDateOfBirth: { type: String, default: '' },
  orphanHealth: { type: String, default: '' },
  placeOfBirth: { type: String, default: '' },
  fatherDeathDate: { type: String, default: '' },
  sponsorStopDate: { type: String, default: '' },
  sponsorshipStatus: { type: String, default: ''},
  notes: { type: String, default: '' },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Orphans', OrphansSchema);
