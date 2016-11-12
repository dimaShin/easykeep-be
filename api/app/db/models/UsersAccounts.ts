import sequelize = require("sequelize");
import DataTypes = sequelize.DataTypes;
import Sequelize = sequelize.Sequelize;
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("UsersAccounts", {
  }, {
    classMethods: {
    }
  });
};