const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeDetailsSchema = new Schema({
  numberOfRooms: { type: String, default: '' },
  numberOfLivingRooms: { type: String, default: '' },
  numberOfSittingRooms: { type: String, default: '' },
  numberOfKitchens: { type: String, default: '' },
  numberOfBathrooms: { type: String, default: '' },
},{ _id : false });

// module.exports = mongoose.model('Guardian', guardianSchema);
module.exports = homeDetailsSchema;