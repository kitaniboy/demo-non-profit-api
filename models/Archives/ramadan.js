const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RamadanSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  seasonalOne: { type: Boolean, default: false},
  seasonalTwo: { type: Boolean, default: false},
  seasonalThree: { type: Boolean, default: false},
  seasonalFour: { type: Boolean, default: false},
  signature: { type: String, default: ''},
  isDone: { type: Boolean, default: false},
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Ramadan', RamadanSchema);
