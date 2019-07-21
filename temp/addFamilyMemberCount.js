const Family = require("../models/Archives/family/family");
const FamilyMembers = require("../models/Archives/familyMembers");

let fam = Family.find({});
for (var f in fam) {
  let members = FamilyMembers.find({ familyId: f.familyId }).count();
  fam.updateOne(
    { familyId: f.familyId },
    { $set: { numberOfFamilyMembers: members } }
  );
}
