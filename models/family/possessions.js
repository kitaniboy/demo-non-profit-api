const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const possessionsSchema = new Schema({
  privateVehicles: { type: String, default: '' },
  rentalVehicles: { type: String, default: '' },
  schoolBus: { type: String, default: '' },
  gasTruck: { type: String, default: '' },
  waterTruck: { type: String, default: '' },
  otherPossessions: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('PossessionsSchema', possessionsSchema);
module.exports = possessionsSchema;