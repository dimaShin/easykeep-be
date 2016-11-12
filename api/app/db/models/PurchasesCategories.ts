import sequelize = require("sequelize");
import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
/**
 * Created by iashindmytro on 11/1/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("PurchasesCategories", {
  }, {
    classMethods: {
    }
  });
};