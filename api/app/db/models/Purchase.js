/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Purchase", {
    quantity: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },
    price: DataTypes.FLOAT,
    cost: DataTypes.FLOAT
  }, {
    hooks: {
      beforeCreate: instance => {
        if (instance.price) {
          instance.cost = instance.quantity * instance.price;
        } else {
          instance.price = instance.cost / instance.quantity;
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Model.belongsTo(models.Product, {as: 'product'});
        Model.belongsTo(models.Transaction);
      }
    }
  });

  return Model;
};