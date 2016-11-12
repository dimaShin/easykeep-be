import sequelize = require("sequelize");
import DataTypes = sequelize.DataTypes;
import Sequelize = sequelize.Sequelize;
import {Models} from "../../types/models";
import Model = sequelize.Model;

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("Purchase", {
    quantity: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },
    price: DataTypes.FLOAT,
    cost: DataTypes.FLOAT
  }, {
    hooks: {
      beforeCreate: (instance : {
        cost: number,
        price: number,
        quantity: number
      }) : void => {
        if (instance.price) {
          instance.cost = instance.quantity * instance.price;
        } else {
          instance.price = instance.cost / instance.quantity;
        }
      }
    },
    classMethods: {
      associate: function(models: Models, model: Model) {
        model.belongsTo(models.Product, {as: 'product'});
        model.belongsTo(models.Transaction);
        model.belongsToMany(models.Category, { through: { model: models.PurchasesCategories }})
      }
    }
  });
};