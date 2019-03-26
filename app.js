const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config(); // configure env variables

// Load dependencies
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const receptionsRouter = require('./routes/receptions');
const homeVisitsRouter = require('./routes/homeVisits');
const visitReportsRouter = require('./routes/visitReports');
const familyRouter = require('./routes/family');
const familyMembersRouter = require('./routes/familyMembers');
const assistanceRouter = require('./routes/assistance');
const financialAssistanceRouter = require('./routes/financialAssistance');
const foodStuffAssistanceRouter = require('./routes/foodStuffAssistance');
const borrowRouter = require('./routes/borrow');
const orphanSponsorsRouter = require('./routes/orphans/orphanSponsors');
const orphanFamilyRouter = require('./routes/orphans/orphanFamily');
const orphansRouter = require('./routes/orphans/orphans');
const lowIncomeFamiliesRouter = require('./routes/lowIncome/lowIncomeFamilies');
const lowIncomeSponsorsRouter = require('./routes/lowIncome/lowIncomeSponsors');
const lowIncomePaymentsRouter = require('./routes/lowIncome/lowIncomePayments');
// const Model = require('./models/Archives/family/family');

// initiate Express app
const app = express();

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true); // fixed error with internal mongoDB depreciated module

// check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('successfully connected');
});

app.use(compression());

// use Helmet for Header protection
app.use(helmet());

var whitelist = ['http://104.248.25.52', 'http://localhost:3000','http://dashboard.alrahma-baraka.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// initialize cors
app.use(cors(corsOptions));

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'family-files',
    acl: 'public-read',
    key: function (request, file, cb) {
      // console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

app.post('/upload', function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      // console.log(error);
      // return response.redirect('/error');
      response.json({message: 'Failed to upload', err: error});
    }
    // console.log('File uploaded successfully.');
    response.json({message: 'File uploaded successfully.'});
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev')); // only logs when in dev env
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all routes
app.use('/', indexRouter); // not active
app.use('/users', usersRouter); // not active
app.use('/receptions', receptionsRouter);
app.use('/homeVisits', homeVisitsRouter);
app.use('/visitReports', visitReportsRouter);
app.use('/family', familyRouter);
app.use('/familyMembers', familyMembersRouter);
app.use('/assistance', assistanceRouter);
app.use('/financialAssistance', financialAssistanceRouter);
app.use('/foodStuffAssistance', foodStuffAssistanceRouter);
app.use('/borrow', borrowRouter);
app.use('/orphanSponsors', orphanSponsorsRouter);
app.use('/orphanFamily', orphanFamilyRouter);
app.use('/orphans', orphansRouter);
app.use('/lowIncomeFamilies', lowIncomeFamiliesRouter);
app.use('/lowIncomeSponsors', lowIncomeSponsorsRouter);
app.use('/lowIncomePayments', lowIncomePaymentsRouter);
// app.use('/ramadan', ramadanRouter);
app.use('/login', loginRouter);

module.exports = app;