const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyAddressSchema = new Schema({
  governorate: { type: String, default: ''  },
  state: { type: String, default: ''  },
  town: { type: String, default: ''  },
  neighborhood: { type: String, default: '' }
}, { _id : false });

// module.exports = mongoose.model('FamilyAddress', familyAddressSchema);
module.exports = familyAddressSchema;