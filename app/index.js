let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let router = require('./router');

let OcrService = require('./services/ocr.service');
let FacebookService = require('./services/facebook.service');
let DbClient = require('./db/dbClient');
let UserService = require('./services/user.service');


let app = express();
let services = {};

app.services = Object.assign(services, {
  ocr: new OcrService(),
  facebook: new FacebookService(),
  db: new DbClient(),
  users: new UserService(services)
});


app.use(cors());
app.use(bodyParser.json());

app.use(router);

module.exports =  app;