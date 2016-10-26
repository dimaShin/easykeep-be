/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    transactionDate: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        if (!user.transactionDate) {
          user.transactionDate = new Date();
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Transaction.hasMany(models.Purchase)
      }
    }
  });

  return Transaction;
};