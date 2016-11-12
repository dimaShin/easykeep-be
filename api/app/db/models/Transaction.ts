import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
import sequelize = require("sequelize");
import Model = sequelize.Model;
import {Models} from "../../types/models";
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Transaction", {
    transactionDate: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (user: {
        transactionDate: Date
      }) : void => {
        if (!user.transactionDate) {
          user.transactionDate = new Date();
        }
      }
    },
    classMethods: {
      associate: (models: Models, model: Model) : void => {
        model.hasMany(models.Purchase, {as: 'purchases'});
        model.belongsTo(models.Account, {as: 'account', foreignKey: 'accountId'});
        model.belongsTo(models.Marketplace, {as: 'marketplace', foreignKey: 'marketplaceId'});
      }
    }
  });
};