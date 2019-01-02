const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Schema.Types.ObjectId }, // visit ID
  username: { type: String },
  password: { type: String },
  role: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);