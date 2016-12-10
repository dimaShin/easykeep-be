
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    name:  {
      type     : DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'DISABLE', 'DELETED'),
      allowNull: false,
      defaultValue: 'DISABLE'
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.hasMany(models.Sessions);
      }
    }
  });
};