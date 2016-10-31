/**
 * Created by iashindmytro on 10/24/16.
 */
const users = require('./users');
const login = require('./login');
const accounts = require('./accounts/accounts.controller');
const products = require('./products/products.controller');
const transactions = require('./transactions/transactions.controller');

/**
 * @api {get} /api/* Querying rules
 *
 * @apiDescription Basic API rules for building queries.
 *
 * Example GET api/users?query={"query":{"name": "John"}}
 *
 * or
 *
 * Example GET api/users?query={"query":{"name": { "$iLike": "Jo%"}}}
 *
 * The list of all available operators could be found in http://docs.sequelizejs.com/en/latest/docs/querying
 *
 * @apiParam {JSON} [query] Query to be applied to filter list
 *
 * @apiName Query Rules
 *
 * @apiGroup Rules
 */


const initRoute = (route, app) => {
  const method = route.method.toLowerCase();
  app[method](route.url, route.handlers)
};
module.exports = app => [
  users,
  login,
  accounts,
  products,
  transactions
].map(routes => routes.map(route => initRoute(route, app)));