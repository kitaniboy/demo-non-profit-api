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
const notificationsRouter = require('./routes/productiveFamilies/notifications')
const statisticsRouter = require('./routes/statistics/statistics.js')

const cronJob = require('./cron job/task.js')

// initiate Express app
const app = express()

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
  // useUnifiedTopology: true
})
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
  '46.101.100.21',
  'http://104.248.25.52',
  'http://localhost:3000',
  'https://dashboard.alrahma-baraka.com',
  'http://dashboard.alrahma-baraka.com',
  'https://alrahma4mc.com/log/morfiqat/test.pdf',
  'https://gifted-payne-0ac760.netlify.com',
  'http://gifted-payne-0ac760.netlify.com',
  'https://gifted-payne-0ac760.netlify.app',
  'https://heuristic-stallman-09135b.netlify.com',
  'https://heuristic-stallman-09135b.netlify.com/',
  'http://heuristic-stallman-09135b.netlify.com/',
  'https://heuristic-stallman-09135b.netlify.app',
  'https://heuristic-stallman-09135b.netlify.app/',
  'http://localhost:5000/status',
'https://desolate-waters-95703.herokuapp.com'
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
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev')) // only logs when in dev env
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// all routes
app.use('/api/users', usersRouter) // not active
app.use('/api/receptions', receptionsRouter)
app.use('/api/visitReports', visitReportsRouter)
app.use('/api/family', familyRouter)
app.use('/api/interiorFamily', interiorFamilyRouter)
app.use('/api/familyMembers', familyMembersRouter)
app.use('/api/assistance', assistanceRouter)
app.use('/api/donation', donationRouter)
app.use('/api/financialAssistance', financialAssistanceRouter)
app.use('/api/foodStuffAssistance', foodStuffAssistanceRouter)
app.use('/api/borrow', borrowRouter)
app.use('/api/orphanSponsors', orphanSponsorsRouter)
app.use('/api/orphanFamily', orphanFamilyRouter)
app.use('/api/orphans', orphansRouter)
app.use('/api/orphanSponsorships', orphanSponsorshipsRouter)
app.use('/api/orphanPayments', orphanPaymentsRouter)
app.use('/api/lowIncomeFamilies', lowIncomeFamiliesRouter)
app.use('/api/lowIncomeSponsors', lowIncomeSponsorsRouter)
app.use('/api/lowIncomePayments', lowIncomePaymentsRouter)
app.use('/api/lowIncomeSponsorships', lowIncomeSponsorshipsRouter)
app.use('/api/insolventFamilies', insolventFamiliesRouter)
app.use('/api/login', loginRouter)
app.use('/api/sponsorship', sponsorshipRouter)
app.use('/api/productiveFamilies', productiveFamiliesRouter)
app.use('/api/notifications', notificationsRouter)
app.use('/api/statistics', statisticsRouter)

cronJob.start()

module.exports = app
