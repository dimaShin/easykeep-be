import Sequelize = sequelize.Sequelize;
import sequelize = require("sequelize");
import {Models} from "../../types/models";
import Model = sequelize.Model;
import AssociationOptionsBelongsToMany = sequelize.AssociationOptionsBelongsToMany;
import DataTypes = sequelize.DataTypes;
/**
 * Created by iashindmytro on 10/24/16.
 */

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Product", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
    classMethods: {
      associate: function(models: Models, model: Model) {
        model.belongsToMany(models.Category, ({
          through: models.ProductsCategories,
          as: 'categories'
        } as AssociationOptionsBelongsToMany));
        model.belongsTo(models.Measure, {
          as: 'measure'
        });
      }
    }
  });

  return Model;
};