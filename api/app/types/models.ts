import sequelize = require("sequelize");
import {Instance} from "./Instance";

export interface Models {
  Account: sequelize.Model<Instance, any>;
  Transaction: sequelize.Model<Instance, any>;
  User: sequelize.Model<Instance, any>;
  UsersAccounts: sequelize.Model<Instance, any>;
  Category: sequelize.Model<Instance, any>;
  ProductsCategories: sequelize.Model<Instance, any>;
  Measure: sequelize.Model<Instance, any>;
  Product: sequelize.Model<Instance, any>;
  PurchasesCategories: sequelize.Model<Instance, any>;
  Session: sequelize.Model<Instance, any>;
  Purchase: sequelize.Model<Instance, any>;
  Marketplace: sequelize.Model<Instance, any>;
}
