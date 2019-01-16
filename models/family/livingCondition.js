const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livingConditionSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  accommodation: {
    oneStoryHouse: { type: Boolean },
    twoStoryHouse: { type: Boolean },
    apartment: { type: Boolean },
    addition: { type: Boolean },
    other: { type: String }
  },
  accommodationStatus: {
    owned: { type: Boolean },
    inherited: { type: Boolean },
    combined: { type: Boolean },
    rent: {
      amount: { type: Number },
      status: { type: Boolean }
    },
  },
  latePayments: {
    rent: { type: Number },
    electrical: { type: Number },
    water: { type: Number },
  },
  homeDetails: {
    numberOfRooms: { type: Number },
    numberOfLivingRooms: { type: Number },
    numberOfSittingRooms: { type: Number },
    numberOfKitchens: { type: Number },
    numberOfBathrooms: { type: Number },
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('LivingConditionSchema', livingConditionSchema);