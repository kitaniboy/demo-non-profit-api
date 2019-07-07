
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reception: { type: Boolean, default: false },
  orphan: { type: Boolean, default: false },
  lowIncome: { type: Boolean, default: false },
  wedding: { type: Boolean, default: false },
  productive: { type: Boolean, default: false },
  finance: { type: Boolean, default: false },
  delegate: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  temp: { type: Boolean, default: false },
  name: { type: String, default: '' }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

module.exports = mongoose.model('User', userSchema);
