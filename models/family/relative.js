const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relativeSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  relation: { type: String },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Relative', relativeSchema);