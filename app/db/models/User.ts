import Sequelize = sequelize.Sequelize;
import DataTypes = sequelize.DataTypes;
import sequelize = require("sequelize");
import {Models} from "../../types/models";
import Model = sequelize.Model;
import authService from '../../services/auth';

let publicKeys = ['name', 'createdAt', 'updatedAt', 'id', 'email', 'phone'];

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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'DISABLE', 'DELETED'),
      allowNull: false,
      defaultValue: 'DISABLE'
    }
  }, {
    classMethods: {
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