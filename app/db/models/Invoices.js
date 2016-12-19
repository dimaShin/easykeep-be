module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Invoices", {
    place:  {
      type      : DataTypes.TEXT,
      allowNull : false,
      unique    : true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.belongsToMany(models.Tags, { through: 'TagsInvoices' });
        model.belongsToMany(models.Products, { through: 'InvoicesProducts' });
      }
    }
  });
};
