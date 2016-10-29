

module.exports = [{

  /**
   * @api {get} /api/products Get products list
   *
   * @apiDescription This route for receiving products list.
   * @apiName getProducts
   *
   * @apiGroup Products
   */

  url: '/api/products',
  method: 'get',
  handlers: [
    (req, res) => {
      let models = req.app.dbClient.db;
      let Product = models.Product;
      let query = req.query.query;

      Product.findAll({
        where: query,
        include: [
          {model: models.Category},
          {model: models.Measure}
        ]
      })
        .then(products => res.send(products))
        .catch(err => res.status(400) && res.send(err));
    }
  ]},
  /**
   * @api {post} /api/products Create new Product
   *
   * @apiDescription This route for creating product.
   *
   * All data should be in request body
   *
   * @apiName createProducts
   *
   * @apiParam {String} name Product name
   * @apiParam {Array} categories Product categories
   * @apiParam {String} measure Product measure
   *
   * @apiGroup Products
   */
  {
    url: '/api/products',
    method: 'post',
    handlers: [
      (req, res) => {
        let data = req.body;

        console.log('got new product: ', data);

        req.app.services.product.create(data)
          .then(product => {
            console.log(product);
            res.send(product);
          }).catch(err => res.status(400) && res.send(err));
      }
    ]

}];