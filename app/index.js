let express = require('express');
let bodyParser = require('body-parser');
let router = require('./router');
let OcrService = require('./services/ocr.service');


let app = express();

app.services = {
  ocr: new OcrService()
}

app.use(bodyParser.urlencoded());
// app.use(bodyParser.raw());

app.use(router);

module.exports =  app;