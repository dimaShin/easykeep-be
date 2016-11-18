

import {Application} from "../../types/app";
import {Models} from "../../types/models";
import {Instance} from "../../types/Instance";
import Transaction = sequelize.Transaction;
import sequelize = require("sequelize");
export default class TransactionService {

  private app: Application;
  private models: Models;

  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  get(query) : Promise<Instance> {
    return this.models.Transaction.findAll({where: query, include: [
      {model: this.models.Account, as: 'account'},
      {model: this.models.Purchase, as: 'purchases', include: [
        {model: this.models.Product, as: 'product'}
      ]},
      {model: this.models.Marketplace, as: 'marketplace'},
    ]})
  }

  create(data): Promise<any> {
    this.app.DbClient.sequelize.transaction(t => {
      return this.doCreate(data, t);
    })
  }

  doCreate(data, t: Transaction): Promise<any> {

    return this.app.services.data.purchase.populateProductAndCategories(data.purchases, t)
      .then(purchases => {

      });
    /*Todo: previous implementation
    let transactionPromise = this.models.Transaction.create({
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
    });

    let productsPromise = this.populatePurchasesRelations(data.purchases, t);

    return Promise.all([transactionPromise, productsPromise])
      .then(payload => {
        let [transaction, products] = payload;

        return Promise.all(products.map(product => transaction.addProduct(product)));
      })
      .then(payload => payload[0]);


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
    }).then(transaction => this.populatePurchasesRelations(transaction, data.purchase, t));


    {



      let relations = [];
      let products = transaction.get('purchases')
        .map((purchase, idx) => {
          return purchaseService.populateProducts(purchase, data[idx].product, t)
        });
      let categories = transaction.get('purchases')
        .map(purchase => {
          return purchaseService.populateCategories(purchase, products, t)
        });
      let marketplace = data.marketplace && this.populateMarketplace(data.marketplace, transaction, t);

      relations.push(...products, marketplace);

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
    })*/
  }

  populatePurchasesRelations(purchasesData, t: Transaction) {
    let purchaseService = this.app.service.data.purchase;
    return Promise.all(purchasesData.map(purchase => {
      return purchaseService.populateProductAndCategories(purchase, t);
    }));
  }

  populateMarketplace(marketplace: Instance, transaction: Instance, t: Transaction): Promise<any> {
    return this.models.Marketplace.findOrCreate(
      { where: {name: marketplace}, transaction: t }
    ).spread(marketplace => transaction.setMarketplace(marketplace));
  }
};
