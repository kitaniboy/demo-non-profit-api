const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const possessionsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  privateVehicles: { type: Number },
  rentalVehicles: { type: Number },
  schoolBus: { type: Number },
  gasTruck: { type: Number },
  waterTruck: { type: Number },
  other: {
    item: { type: String },
    number: { type: Number }
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

// module.exports = mongoose.model('PossessionsSchema', possessionsSchema);
module.exports = possessionsSchema;