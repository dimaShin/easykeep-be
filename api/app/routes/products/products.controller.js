/**
 * Created by iashindmytro on 10/26/16.
 */


module.exports = [{

  /**
   * @api {get} /api/products Get products list
   *
   * @apiDescription This route for receiving products list.
   */

  url: '/api/products',
  method: 'get',
  handlers: [
    (req, res) => {
      let Product = req.app.dbClient.db.Product;
      let query = req.query.query;

      Product.findAll({where: query})
        .then(products => res.send(products))
        .catch(err => res.status(400) && res.send(err));
    }
  ]

}];