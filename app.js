const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config() // configure env variables

// Routers
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const receptionsRouter = require('./routes/receptions')
const visitReportsRouter = require('./routes/visitReports')
const familyRouter = require('./routes/family')
const interiorFamilyRouter = require('./routes/interiorFamily')
const familyMembersRouter = require('./routes/familyMembers')
const assistanceRouter = require('./routes/assistance')
const donationRouter = require('./routes/donation')
const financialAssistanceRouter = require('./routes/financialAssistance')
const foodStuffAssistanceRouter = require('./routes/foodStuffAssistance')
const borrowRouter = require('./routes/borrow')
const orphanSponsorsRouter = require('./routes/orphans/orphanSponsors')
const orphanFamilyRouter = require('./routes/orphans/orphanFamily')
const orphansRouter = require('./routes/orphans/orphans')
const orphanSponsorshipsRouter = require('./routes/orphans/orphanSponsorships')
const orphanPaymentsRouter = require('./routes/orphans/orphanPayments')
const lowIncomeFamiliesRouter = require('./routes/lowIncome/lowIncomeFamilies')
const lowIncomeSponsorsRouter = require('./routes/lowIncome/lowIncomeSponsors')
const lowIncomePaymentsRouter = require('./routes/lowIncome/lowIncomePayments')
const lowIncomeSponsorshipsRouter = require('./routes/lowIncome/lowIncomeSponsorships')
const insolventFamiliesRouter = require('./routes/lowIncome/insolventFamilies')
const sponsorshipRouter = require('./routes/sponsorship')
const productiveFamiliesRouter = require('./routes/productiveFamilies/productiveFamilies')
const statisticsRouter = require('./routes/statistics/statistics.js')

const cronJob = require('./cron job/task.js')

// initiate Express app
const app = express()

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true) // fixed error with internal mongoDB depreciated module

// check db connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('successfully connected')
})

app.use(compression())

// use Helmet for Header protection
app.use(helmet())

// default options
// app.use(fileUpload())

var whitelist = [
  'http://104.248.25.52',
  'http://localhost:3000',
  'https://compassionate-bartik-d3fca5.netlify.com/'
]
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// initialize cors
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev')) // only logs when in dev env
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// all routes
app.use('/users', usersRouter) // not active
app.use('/receptions', receptionsRouter)
app.use('/visitReports', visitReportsRouter)
app.use('/family', familyRouter)
app.use('/interiorFamily', interiorFamilyRouter)
app.use('/familyMembers', familyMembersRouter)
app.use('/assistance', assistanceRouter)
app.use('/donation', donationRouter)
app.use('/financialAssistance', financialAssistanceRouter)
app.use('/foodStuffAssistance', foodStuffAssistanceRouter)
app.use('/borrow', borrowRouter)
app.use('/orphanSponsors', orphanSponsorsRouter)
app.use('/orphanFamily', orphanFamilyRouter)
app.use('/orphans', orphansRouter)
app.use('/orphanSponsorships', orphanSponsorshipsRouter)
app.use('/orphanPayments', orphanPaymentsRouter)
app.use('/lowIncomeFamilies', lowIncomeFamiliesRouter)
app.use('/lowIncomeSponsors', lowIncomeSponsorsRouter)
app.use('/lowIncomePayments', lowIncomePaymentsRouter)
app.use('/lowIncomeSponsorships', lowIncomeSponsorshipsRouter)
app.use('/insolventFamilies', insolventFamiliesRouter)
app.use('/login', loginRouter)
app.use('/sponsorship', sponsorshipRouter)
app.use('/productiveFamilies', productiveFamiliesRouter)
app.use('/statistics', statisticsRouter)

cronJob.start()

module.exports = app
