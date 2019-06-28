module.exports = {
  assistance: [
    'cost',
    'familyId',
    'supportNeeded.date',
    'supportNeeded.description',
    'assistanceCategory',
    'assistanceId',
    'familyId',
    '_id'
  ],
  borrow: [
    'formId',
    'familyId',
    'familyName',
    'recipientName',
    'department',
    'nameOfEmployee',
    'dateOfBorrow',
    'dateOfReturn',
    '_id'
  ],
  family: [
    '_id',
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandPhone',
    'husband.husbandCivilId',
    'dateOfCaseStudy',
    'familyId',
    'formId',
    'isRamadan',
    'familyAddress.state'
  ],
  ramadan: [
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandPhone',
    'husband.husbandCivilId',
    'familyId',
    'ramadan',
    'formId',
    'familyAddress.state',
    '_id'
  ],
  ramadanOne: [
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandPhone',
    'husband.husbandCivilId',
    'familyId',
    'ramadan',
    'formId',
    'signature',
    'familyAddress.state',
    '_id'
  ],
  report: [
    'typeOfAssistanceNeeded',
    'dateOfCaseStudy',
    'claimMadeBy',
    'formId',
    'familyCategory',
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandCivilId',
    'husband.husbandPhone',
    'familyId',
    '-_id'
  ],
  familyMembers: [
    'familyAddress',
    'typeOfAssistanceNeeded',
    'familyCategory',
    'husband',
    'wife',
    'income',
    'familyId',
    '-_id'
  ],
  orphanFamilies: [
    'familyAddress',
    'husband.husbandName',
    'husband.husbandCivilId',
    'husband.husbandPhone',
    'familyCategory',
    'wife.wifeName',
    'guardian.guardianName',
    'wife.wifeCivilId',
    'wife.wifePhone',
    'formId',
    'familyId',
    '-_id'
  ]
};