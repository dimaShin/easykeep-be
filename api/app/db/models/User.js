/**
 * Created by iashindmytro on 10/23/16.
 */

module.exports = function(sequelize, DataTypes, app) {
  var User = sequelize.define("User", {
    name:  {
      type     : DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:  {
      type     : DataTypes.STRING,
      allowNull: false,
      set      : function(val) {
        this.setDataValue('password', app.services.auth.hash(val));
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Account, {through: models.UsersAccounts})
      }
    },
    instanceMethods: {
      toJSON: function (){
        let publicData = ['name', 'createdAt', 'updatedAt', 'id'].reduce((data, field) => {
          data[field] = this.dataValues[field];

          return data;
        }, {});

        return JSON.stringify(publicData);
      }
    }
  });

  return User;
};