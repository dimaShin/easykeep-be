/**
 * Created by iashindmytro on 10/25/16.
 */

module.exports = [{

  /**
   * @api {post} /api/purchases Create New Purchase
   *
   * @apiDescription This route for creating new purchases.
   * All params must be in request body.
   * One of the fields cost or price must be set.
   * If set price - cost will be calculated else price will be calculated from cost.
   * Product and Marketplace will be created if not in DB yet.
   * If no AccountId provided user's default account will be associated with transaction.
   *
   *
   * @apiName createPurchase
   * @apiGroup Purchase
   * @apiHeader {String} auth-token Authorization token
   *
   * @apiParam {FLOAT} [price] Price of the purchase
   * @apiParam {FLOAT} [cost] Cost of the purchase
   * @apiParam {FLOAT} [quantity=1] Quantity of the purchase
   *
   * @apiParam {String} [AccountId] Account for the purchase
   * @apiParam {String} [marketplace] Marketplace of the purchase
   * @apiParam {String} [product] Marketplace of the purchase
   * @apiParam {Date} [transactionDate=now] Date of the purchase
   *
   * @apiSampleRequest 127.0.0.1:3000/api/purchase
   *
   * @apiSuccess {JSON} Purchase The model instance
   */

  url: '/api/purchases',
  method: 'POST',
  handlers: [
    (req, res) => {
      let app = req.app;
      let Purchase = app.dbClient.db.Purchase;
      let Marketplace = app.dbClient.db.Marketplace;
      let Product = app.dbClient.db.Product;
      let Transaction = app.dbClient.db.Transaction;
      let data = req.body;
      let accountId = data.AccountId || req.app.user.defaultAccount;

      Promise.all([
        Purchase.create(Object.assign({}, {
          price: data.price,
          cost: data.cost,
          quantity: data.quantity
        })),
        Marketplace.findOrCreate({ where: {name: data.marketplace} }),
        Product.findOrCreate({ where: {name: data.product} }),
        Transaction.create({ transactionDate: data.transactionDate, AccountId: accountId })

      ]).then(resolves => {
        let [purchase, [marketplace], [product], transaction] = resolves;

        purchase.set({
          MarketplaceId: marketplace.dataValues.id,
          ProductId: product.dataValues.id,
          TransactionId: transaction.dataValues.id
        });
        return purchase.save();
      }).then(purchase => res.send(purchase.toJSON()))

    }
  ]
}];