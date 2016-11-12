import sequelize = require("sequelize");
import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Marketplace", {
    name: {type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.hasMany(models.Transaction);
      }
    }
  });
};