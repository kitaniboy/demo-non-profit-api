const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ramadanSchema = new Schema({
  breakfast: { type: Boolean, default: false},
  eidSupport: { type: Boolean, default: false},
  zakat: { type: Boolean, default: false},
  eidSacrifice: { type: Boolean, default: false},
  date: { type: String, default: '' },
  signature: { type: String, default: ''},
  bookBags: { type: String, default: '0'},
  notes: { type: String, default: ''}
}, { _id : false });

// module.exports = mongoose.model('Ramadan', ramadanSchema);
module.exports = ramadanSchema;
