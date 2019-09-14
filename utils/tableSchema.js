module.exports = {
  reception: [
    'receptionNumber',
    'familyId',
    'date',
    'visitorName',
    'purposeOfVisit',
    'caseMovedTo',
    '_id',
    'caseClosed'
  ],
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
    'familyAddress.state',
    'familyAddress.town',
    'isArchived',
    'reasonForArchiving'
    // 'numberOfChildrenInElementary',
    // 'numberOfChildrenInSecondary',
    // 'numberOfChildrenInHighSchool',
    // 'numberOfChildrenInHigherEducation'
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
  eidAlAdha: [
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandPhone',
    'husband.husbandCivilId',
    'familyId',
    'eidAlAdha',
    'formId',
    'familyAddress.state',
    '_id'
  ],
  eidAlAdhOne: [
    'wife.wifeName',
    'wife.wifePhone',
    'wife.wifeCivilId',
    'husband.husbandName',
    'husband.husbandPhone',
    'husband.husbandCivilId',
    'familyId',
    'formId',
    'eidAlAdha',
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
  ],
  insolventFamilies: [
    'husband.husbandName',
    'husband.husbandPhone',
    'wife.wifeName',
    'wife.wifePhone',
    'accommodationStatus.rent',
    'livingCondition',
    'familyAddress',
    'numberOfChildrenInElementary',
    'numberOfChildrenInSecondary',
    'numberOfChildrenInHighSchool',
    'income',
    'loan',
    // main not family
    'lowIncomeFamilyId',
    'formId',
    'sponsorshipEndDate',
    'shoppingCenterName',
    'notes',
    'isActive'
  ]
}
