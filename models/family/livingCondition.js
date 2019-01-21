const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livingConditionSchema = new Schema({
  oneStoryHouse: { type: Boolean, default: false },
  twoStoryHouse: { type: Boolean, default: false },
  apartment: { type: Boolean, default: false },
  addition: { type: Boolean, default: false },
  otherAccommodation: { type: String, default: '' }
},{ _id : false });

// module.exports = mongoose.model('LivingConditionSchema',
// livingConditionSchema);

module.exports = livingConditionSchema;