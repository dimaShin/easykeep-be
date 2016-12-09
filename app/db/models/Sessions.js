module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Sessions", {
    token:  {
      type      : DataTypes.TEXT,
      allowNull : false,
      unique    : true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull   : false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.belongsTo(models.Users);
      }
    }
  });
};