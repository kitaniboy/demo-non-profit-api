const cron = require('node-cron')

const orphanSponsorModel = require('../models/orphans/orphanSponsors')

// const seconds = '*'
const minutes = '1'
const hour = '1'
const dayOfMonth = '1'
const month = '*'
const dayOfWeek = '*'

const scheduledTime = `${minutes} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`

var task = cron.schedule(
  scheduledTime,
  async () => {
    // console.log('task started')
    try {
      await orphanSponsorModel.update(
        {
          sponsorStatus: 'فعال',
          paymentMethod: 'نقد شهري'
        },
        { $set: { hasPaidThisMonth: false } },
        { multi: true }
      )
      await orphanSponsorModel.update(
        {
          sponsorStatus: 'فعال',
          paymentMethod: 'نقد عدة أشهر'
        },
        { $set: { hasPaidThisMonth: false } },
        { multi: true }
      )
      await orphanSponsorModel.update(
        {
          sponsorStatus: 'فعال',
          paymentMethod: 'ايداع شهري'
        },
        { $set: { hasPaidThisMonth: false } },
        { multi: true }
      )
      await orphanSponsorModel.update(
        {
          sponsorStatus: 'فعال',
          paymentMethod: 'ايدع عدة اشهر'
        },
        { $set: { hasPaidThisMonth: false } },
        { multi: true }
      )
      //   console.log('done')
    } catch (e) {
      console.log(e)
    }
  },
  {
    scheduled: false
  }
)

task.start()

module.exports = task
