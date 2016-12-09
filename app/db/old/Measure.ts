import Sequelize = sequelize.Sequelize;
import sequelize = require("sequelize");
import DataTypes = sequelize.DataTypes;
/**
 * Created by iashindmytro on 10/23/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Measure", {
    name: { type: DataTypes.STRING, unique: true },
    shortname: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {}
  });
};
