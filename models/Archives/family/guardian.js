const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guardianSchema = new Schema({
  guardianName: { type: String, default: '' },
  guardianCivilID: { type: String, default: '' },
  guardianRelation: { type: String, default: '' },
  guardianPhone: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('Guardian', guardianSchema);
module.exports = guardianSchema;