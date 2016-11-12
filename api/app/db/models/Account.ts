import sequelize = require("sequelize");
import DataTypes = sequelize.DataTypes;
import Sequelize = sequelize.Sequelize;
import {Models} from "../../types/models";
import Model = sequelize.Model;
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model  => {
  return sequelize.define("Account", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models: Models, model: Model) {
        model.hasMany(models.Transaction, {foreignKey: 'accountId'});
        model.belongsToMany(models.User, {through: models.UsersAccounts});
      }
    }
  });
};