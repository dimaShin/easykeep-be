/**
 * Created by iashindmytro on 10/24/16.
 */
const users = require('./users');
const login = require('./login');
const accounts = require('./accounts/accounts.controller');
const purchases = require('./purchases/purchases.controller.js');
const products = require('./products/products.controller');

/**
 * @api {get} /api/* Querying rules
 *
 * @apiDescription Basic API rules for building queries.
 *
 * $and: {a: 5}           // AND (a = 5)
 *
 * $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
 $gt: 6,                // > 6

 $gte: 6,               // >= 6

 $lt: 10,               // < 10

 $lte: 10,              // <= 10

 $ne: 20,               // != 20

 $eq: 3,                // = 3

 $not: true,            // IS NOT TRUE

 $between: [6, 10],     // BETWEEN 6 AND 10

 $notBetween: [11, 15], // NOT BETWEEN 11 AND 15

 $in: [1, 2],           // IN [1, 2]

 $notIn: [1, 2],        // NOT IN [1, 2]

 $like: '%hat',         // LIKE '%hat'

 $notLike: '%hat'       // NOT LIKE '%hat'

 $iLike: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)

 $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)


 $like: { $any: ['cat', 'hat']}
 // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike

 $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)

 $contains: [1, 2]      // @> [1, 2] (PG array contains operator)

 $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)

 $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

 $col: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
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
  purchases,
  products
].map(routes => routes.map(route => initRoute(route, app)));