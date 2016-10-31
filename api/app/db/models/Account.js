/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Account.hasMany(models.Transaction, {foreignKey: 'accountId'});
        Account.belongsToMany(models.User, {through: models.UsersAccounts});
      }
    }
  });

  return Account;
};