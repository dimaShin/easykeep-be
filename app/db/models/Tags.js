module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Tags", {
    name:  {
      type      : DataTypes.TEXT,
      allowNull : false,
      unique    : true
    }
  }, {
    classMethods: {
      associate: function(models, model) {
        model.belongsToMany(models.Invoices, { through: 'TagsInvoices' });
      }
    }
  });
};
