module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Products", {
    name:  {
      type      : DataTypes.TEXT,
      allowNull : false,
      unique    : true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.belongsToMany(models.Invoices, { through: 'InvoicesProducts' })
      }
    }
  });
};
