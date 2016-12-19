module.exports = (sequelize, DataTypes) => {
  return sequelize.define("InvoicesProducts", {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull   : false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull   : false
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull   : false
    }
  }, {
    classMethods: {
    }
  });
};
