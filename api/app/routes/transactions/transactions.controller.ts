
import {Request} from "../../types/request";
import {Response} from "../../types/response";
export default [

  /**
   * @api {get} /api/transaction Get Transactions List
   *
   * @apiDescription This route for getting transactions.
   *
   * Account, Purchases with Product and Marketplace models will be included in result item
   *
   * Query parameters works as usual (see Rules section)
   *
   * If no accountId provided default user's account will be used
   *
   * @apiName getTransaction
   *
   * @apiParam {json} [query] Query for list filtering

   * @apiGroup Transaction
   */
  {
    url: '/api/transactions',
    method: 'GET',
    handlers: [
      (req: Request, res: Response) => {
        let query = req.query || {};

        if (!query.accountId) {
          query.accountId = req.user.get('defaultAccount');
        }

        req.app.services.data.transaction.get(query)
          .then(transactions => res.send(transactions))
          .catch(err => {
            console.log('----------- got error: ', err);
            res.status(400).end(err);
          })
      }
    ]
  },

  /**
   * @api {post} /api/transaction Create new Transaction
   *
   * @apiDescription This route for creating transaction.
   *
   * All data should be in request body.
   *
   * @apiName createTransaction
   *
   * @apiParam {String} [marketlape] Marketplace name
   * @apiParam {Date} [transactionDate = today] Date of the transaction
   * @apiParam {String} [accountId = currentUser.defaultAccount] Account of transaction
   * @apiParam {Array} purchases List of purchases in transaction.
   *Purchase should be an object like:
   *
   *{
   *
   *  "product": "beer",
   *
   *  "quantity": FLOAT //default value = 1
   *
   *  "cost": FLOAT
   *
   *  "price": FLOAT
   *
   *}
   *
   * One of the fields cost or price must be set.
   * If set price - cost will be calculated else price will be calculated from cost.
   *
   * @apiGroup Transaction
   */

  {
    url: '/api/transactions',
    method: 'POST',
    handlers: [
      (req: Request, res: Response) => {
        let data = req.body;

        if (!data.accountId) {
          data.accountId = req.user.defaultAccount
        }

        req.app.services.data.transaction.create(data)
          .then(transaction => res.send(transaction))
          .catch(err => {
            console.error('--------------got error: ', err);
            return res.status(400).send(err)
          } )
      }
    ]
  },

  {

    /**
     * @api {post} /api/transactions/:transactionId/purchases TBD - Add purchase
     *
     * @apiDescription TBD
     *
     * This route will be implemented to add purchase into existing transaction
     *
     * @apiName addPurchase
     * @apiGroup Transaction
     * @apiHeader {String} auth-token Authorization token
     *
     * @apiParam {FLOAT} [price] Price of the purchase
     * @apiParam {FLOAT} [cost] Cost of the purchase
     * @apiParam {FLOAT} [quantity=1] Quantity of the purchase
     * @apiParam {String} product Product name
     */

    url: '/api/transactions/:id/purchases',
    method: 'POST',
    handlers: [
      (req, res) => {

        res.status(501).end();

      }
    ]
  }
];