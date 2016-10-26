/**
 * Created by iashindmytro on 10/23/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Measure", {
    name: { type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {}
  });

  return Model;
};
