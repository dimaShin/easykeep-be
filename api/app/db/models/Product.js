/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Product", {
    name: { type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {
      associate: function(models) {
        Model.belongsToMany(models.Category, {through: models.ProductsCategories});
        Model.belongsTo(models.Measure);
      }
    }
  });

  return Model;
};