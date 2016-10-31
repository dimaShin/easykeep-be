

module.exports = class TransactionService {


  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  create(data) {

    return this.models.Transaction.create({
      transactionDate: data.transactionDate,
      purchases: data.purchases.map(purchase => ({
        price: purchase.price,
        quantity: purchase.quantity,
        cost: purchase.cost
      })),
      accountId: data.accountId
    }, {
      include: [{ model: this.models.Purchase, as: 'purchases' }]
    }).then(transaction => {
      let relations = [];
      let products = Promise.all(
        transaction.purchases.map(
          (purchase, index) => this.populateProduct(purchase, data.purchases[index])
        )
      );
      let marketplace = data.marketplace && this.populateMarketplace(data.marketplace, transaction);

      relations.push(products, marketplace);

      return Promise.all(relations)
        .then((payload) => {
          return this.models.Transaction.find({
            where: {id: transaction.get('id')},
            include: [
              {model: this.models.Marketplace, as: 'marketplace'},
              {model: this.models.Purchase, as: 'purchases', include: [
                {model: this.models.Product, as: 'product'}
              ]}
            ]
          });
        });
    })
  }

  populateProduct(purchaseModel, purchaseData) {
    return this.models.Product.findOrCreate(
      {where: { name: purchaseData.product }, defaults: {name: purchaseData.product}}
    ).spread(product =>  purchaseModel.setProduct(product));
  }

  populateMarketplace(marketplace, transaction) {
    return this.models.Marketplace.findOrCreate(
      { where: {name: marketplace} }
    ).spread(marketplace => transaction.setMarketplace(marketplace));
  }
};
