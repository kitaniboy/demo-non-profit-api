
const receptionSeedSchema = (NumOfDocuments) => ({
  receptionNumber: `${NumOfDocuments+1}`,
  familyId: `${NumOfDocuments}`,
  date: 'vdasc',
  newCase: true,
  visitorName:  'cdcda',
  visitorPhone: 'cdscds',
  address:   'vfsvfsv',
  purposeOfVisit: 'vfsvfsv', // case
  response: 'vfsvfsv', // dept response
  solutionGiven: 'vfsvfsv', // what was done?
  caseMovedTo: 'vfsvfsv', // who will handle it?
  caseCategory: 'vfsvfsv',
  documentsMissing: 'vfsvfsv',
  caseClosed: false
});

module.exports = receptionSeedSchema;