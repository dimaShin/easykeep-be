let Sequelize = require('sequelize');
let fs        = require("fs");
let path      = require("path");

let models = [
  'Users',
  'Sessions',
  'FacebookAccounts',
  'Invoices',
  'InvoicesProducts',
  'Products',
  'Tags'
];

let connectionConfig = {
  "username": "postgres",
  "password": "123456",
  "database": "postgres",
  "host": "127.0.0.1",
  "dialect": "postgres",
  [Symbol.iterator]: function* () {
    yield connectionConfig.database;
    yield connectionConfig.username;
    yield connectionConfig.password;
    yield connectionConfig;
  }
};

module.exports = class DbClient {

  models;
  _sequelize;

  constructor() {
    this._sequelize = new Sequelize(...connectionConfig);
    this.models = models
      .map(modelName => require(path.join(__dirname, 'models', modelName))(this._sequelize, Sequelize))
      .reduce((db, file) => DbClient.createModel(db, file), {});

    DbClient.createAssociations(this.models);

    Object.assign(this, {Sequelize});

    this.sync({ force: false });
  }

  static createModel(db, model) {
    db[model.name] = model;
    return db;
  }

  static createAssociations(db) {
    Object.keys(db).forEach(function(modelName) {
      if ("associate" in db[modelName]) {
        db[modelName].associate(db, db[modelName]);
      }
    });
  }

  sync(options) {
    this._sequelize.sync(options);
  }

  startTransaction() {
    return this._sequelize.transaction();
  }

};