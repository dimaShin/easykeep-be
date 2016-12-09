
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("FacebookAccounts", {
    fbUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.belongsTo(models.Users);
      }
    }
  });
};
