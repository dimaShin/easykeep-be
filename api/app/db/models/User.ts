import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
import sequelize = require("sequelize");
import {Models} from "../../types/models";
import Model = sequelize.Model;
import authService from '../../services/auth';

let publicKeys = ['name', 'createdAt', 'updatedAt', 'id', 'email'];

export default (sequelize: Sequelize, DataTypes: DataTypes) : sequelize.Model => {
  return sequelize.define("User", {
    name:  {
      type     : DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:  {
      type     : DataTypes.STRING,
      allowNull: false,
      set      : function(val) {
        this.setDataValue('password', authService.hash(val));
      }
    },
    defaultAccount: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'DISABLE', 'DELETED'),
      allowNull: false,
      defaultValue: 'DISABLE'
    }
  }, {
    classMethods: {
      associate: (models: Models, model: Model) => {
        model.belongsToMany(models.Account, {through: models.UsersAccounts})
      }
    },
    instanceMethods: {
      toJSON: function () {
        let publicData = publicKeys.reduce((data, field) => {
          data[field] = this.dataValues[field];

          return data;
        }, {});

        return JSON.stringify(publicData);
      },
      getPublicData: function () {
        let publicData = publicKeys.reduce((data, field) => {
          data[field] = this.dataValues[field];

          return data;
        }, {});

        return (publicData);
      }
    }
  });
};