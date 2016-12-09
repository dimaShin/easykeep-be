import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
import sequelize = require("sequelize");
import Model = sequelize.Model;
import {Models} from "../../types/models";
/**
 * Created by iashindmytro on 10/23/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Session", {
    token:  {
      type     : DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models: Models, model: Model) {
        model.belongsTo(models.User)
      }
    }
  });
};