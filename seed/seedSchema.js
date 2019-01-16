export const receptionSeedSchema = (NumOfDocuments) => {
  let model;
  for (let i =0; i < NumOfDocuments; i++) {
    model.push([
      new Model({
        familyID: `${i}`,
        visitorName:  'ماهر',
        visitorPhone: '97440004',
        address:   'العذيبة',
        purposeOfVisit: 'اسئلة',
        response: 'اسئلة',
        caseAgent: 'تم نقل الى الارشفة',
        caseCategory: 'عاجلة',
        documentsMissing: 'شهادة الميلاد'
      })
    ]);
  }
}