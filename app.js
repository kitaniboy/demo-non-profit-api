const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const visitsRouter = require('./routes/visits');

const app = express();

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true); // fixed error with internal mongoDB depreciated module

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
  console.log('successfully connected');
});

app.use(logger('dev')); // only logs when in dev env
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter); // not active
app.use('/users', usersRouter); // not active
app.use('/visits', visitsRouter);

module.exports = app;
