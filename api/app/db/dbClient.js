/**
 * Created by iashindmytro on 10/23/16.
 */
let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");

module.exports = class DbClient {

  constructor(config, app) {
    this.models = [
      'User',
      'Account',
      'Category',
      'Marketplace',
      'Product',
      'Purchase',
      'Transaction',
      'ProductsCategories',
      'TransactionsMarketplaces',
      'UsersAccounts',
      'Measure',
      'Session'
    ];
    this._sequelize = new Sequelize(...config);
    this.db = this.models
      .map(modelName => require(path.join(__dirname, 'models', modelName))(this._sequelize, Sequelize, app))
      .reduce((db, file) => DbClient.createModel(db, file), {});

    DbClient.createAssociations(this.db);

    Object.assign(this, {Sequelize});
  }

  static createModel(db, model) {
    db[model.name] = model;
    return db;
  }

  static createAssociations(db) {
    Object.keys(db).forEach(function(modelName) {
      if ("associate" in db[modelName]) {
        db[modelName].associate(db);
      }
    });
  }

  sync(options) {
    this._sequelize.sync(options);
  }

};