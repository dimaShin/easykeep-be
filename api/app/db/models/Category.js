/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Category", {
    name: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {
    }
  });

  return Model;
};
