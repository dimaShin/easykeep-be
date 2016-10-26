/**
 * Created by iashindmytro on 10/24/16.
 */
const users = require('./users');
const login = require('./login');
const accounts = require('./accounts/accounts.controller');
const purchases = require('./purchases/purchases.controller.js');
const products = require('./products/products.controller');

const initRoute = (route, app) => {
  const method = route.method.toLowerCase();
  app[method](route.url, route.handlers)
};
module.exports = app => [
  users,
  login,
  accounts,
  purchases,
  products
].map(routes => routes.map(route => initRoute(route, app)));