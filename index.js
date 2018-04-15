const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoXlsx = require('mongo-xlsx');

const passport = require('koa-passport');

const mongoose = require('mongoose');

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(passport.initialize());

const router = require('./routes/index');
app.use(router.routes());

const dbConfig = require ('./db');
mongoose.Promise = Promise;
mongoose.set('debug', true);
// mongoose.connect(dbConfig.url, { useMongoClient: true });
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.connection.on('error', console.error);

require('./passport');

app.listen(3001);
