
const receptionSeedSchema = (NumOfDocuments) => ({
  receptionNumber: `${NumOfDocuments+100}`,
  familyId: `${NumOfDocuments+200}`,
  date: '2015',
  newCase: true,
  visitorName:  'gfds',
  visitorPhone: 'fdsg',
  address:   'vfsvgfdsgdfsv',
  purposeOfVisit: 'vfdsfgsvfsv', // case
  response: 'vfsvgfdsfsv', // dept response
  solutionGiven: 'vfsgfdsvfsv', // what was done?
  caseMovedTo: 'vfsvgfdsfsv', // who will handle it?
  caseCategory: 'vfsgdfvfsv',
  documentsMissing: 'vgfdfsvfsv',
  caseClosed: true
});

module.exports = receptionSeedSchema;