import bodyParser = require("body-parser");
import {DbClient} from "./db/dbClient";
import {Application} from "./types/app";
import Express = e.Express;
import e = require("express");

const express = require('express');
const app: Application = express();
const Mailer = require('./services/mailer');
const config = require('./config')(process.env);
const logger = require('./logger');
const router = require('./routes');

const dataServices = require('./services/data');

const queryParser = require('./services/queryParser');
const cors = require('./services/cors');

app['use'](cors);

app.config = config;

app.dbClient = new DbClient(app);
app.dbClient.sync({ loggin: console.log });

const services = {
  auth: require('./services/auth'),
  data: dataServices(app),
  mailer: new Mailer()
};

services.mailer.verifyConnection();

app.services = services;


app['use'](bodyParser.urlencoded({ extended: false, force: true }));
app['use'](bodyParser.json());

logger(app);

app['use']('/api/*', services.auth.verifySession);
app['use']('/api/*', queryParser);
app['use']('/api/*', services.auth.populateUser);

router(app);

app['use'](require('./services/errorHandler'));

module.exports = app;