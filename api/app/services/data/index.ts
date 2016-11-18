
import {ProductService} from "./product";
let UserService = require('./user');
let PurchaseService = require('./purchase');
let TransactionService = require('./transaction');

module.exports = app => {
  return {
    product: new ProductService(app),
    user: new UserService(app),
    purchase: new PurchaseService(app),
    transaction: new TransactionService(app)
  }
};