/**
 * Created by iashindmytro on 10/23/16.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DbClient = require('./db/dbClient');
const config = require('./config')(process.env);
const logger = require('./logger');
const router = require('./routes');
const UserService = require('./services/user');
const queryParser = require('./services/queryParser');

app.config = config;

const services = {
  auth: require('./services/auth'),
  user: new UserService(app)
};

app.services = services;

app.dbClient = new DbClient(app);
app.dbClient.sync({ loggin: console.log });

app.use(bodyParser.urlencoded({ extended: false, force: true }));
app.use(bodyParser.json());

logger(app);

app.use('/api/*', services.auth.verifySession);
app.get('/api/*', queryParser);
app.use('/api/*', services.auth.populateUser);

router(app);

app.use(require('./services/errorHandler'));

module.exports = app;