/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Marketplace", {
    name: {type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {
      associate: function(models) {
        Model.hasMany(models.Purchase);
      }
    }
  });

  return Model;
};