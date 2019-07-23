const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
TRANSLATION
==============================================
 eidDonation: كسوة عيد
 eidSacrifice: اضحية
 eidFoodDonation: مواد غذائية
==============================================
*/

const eidAlAdhaSchema = new Schema(
  {
    eidDonation: { type: Boolean, default: false },
    eidSacrifice: { type: Boolean, default: false },
    eidFoodDonation: { type: Boolean, default: false },
    isDone: { type: Boolean, default: false },
    date: { type: String, default: "" },
    notes: { type: String, default: "" }
  },
  { _id: false }
);

module.exports = eidAlAdhaSchema;
