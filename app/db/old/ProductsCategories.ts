import Sequelize = sequelize.Sequelize;
import sequelize = require("sequelize");
import DataTypes = sequelize.DataTypes;
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("ProductsCategories", {
  }, {
    classMethods: {
    }
  });
};
