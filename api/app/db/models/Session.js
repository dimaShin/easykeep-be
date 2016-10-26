/**
 * Created by iashindmytro on 10/23/16.
 */

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Session", {
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
      associate: function(models) {
        User.belongsTo(models.User)
      }
    }
  });

  return User;
};