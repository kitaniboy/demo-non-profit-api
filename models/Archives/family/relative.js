const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relativeSchema = new Schema({
  relativeName: { type: String, default: '' },
  relativePhone: { type: String, default: '' },
  relativeRelation: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('Relative', relativeSchema);
module.exports = relativeSchema;