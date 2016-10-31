

module.exports = class TransactionService {


  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  create(data) {
    this.app.DbClient.sequelize.transaction(t => {
      return this.doCreate(data, t);
    })
  }

  doCreate(data, t) {

    return this.models.Transaction.create({
      transactionDate: data.transactionDate,
      purchases: data.purchases.map(purchase => ({
        price: purchase.price,
        quantity: purchase.quantity,
        cost: purchase.cost
      })),
      accountId: data.accountId
    }, {
      transaction: t,
      include: [{ model: this.models.Purchase, as: 'purchases' }]
    }).then(transaction => {
      let relations = [];
      let products = Promise.all(
        transaction.purchases.map(
          (purchase, index) => this.populateProduct(purchase, data.purchases[index], t)
        )
      );
      let marketplace = data.marketplace && this.populateMarketplace(data.marketplace, transaction, t);

      relations.push(products, marketplace);

      return Promise.all(relations)
        .then(() => {
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

  populateProduct(purchaseModel, purchaseData, t) {
    return this.models.Product.findOrCreate(
      {where: { name: purchaseData.product }, defaults: {name: purchaseData.product}, transaction: t}
    ).spread(product =>  purchaseModel.setProduct(product));
  }

  populateMarketplace(marketplace, transaction, t) {
    return this.models.Marketplace.findOrCreate(
      { where: {name: marketplace}, transaction: t }
    ).spread(marketplace => transaction.setMarketplace(marketplace));
  }
};
