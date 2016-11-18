

import {Application} from "../../types/app";
import {Models} from "../../types/models";
import {Instance} from "../../types/Instance";

export default class PurchaseService {

  private app: Application;
  private models: Models;

  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  public create(data) {


  }

  public populateProducts(purchase, products, t) {

    let productModels = products.map(product => {

      if (product instanceof this.models.Product) {
        return product;
      }

      return this.models.Product.findOrCreate({
        where: { name: product },
        defaults: {name: product},
        include: [{model: this.models.Category, as: 'categories'}],
        transaction: t
      }).spread(product => purchase.addProduct());
    });

    return this.doPopulateProducts(purchase, productModels, t)

  }

  private doPopulateProducts(purchaseModel, productModels, t) {
    return (<any>Promise).all(productModels.map(p => purchaseModel.addProduct(p, {transaction: t})))
  }

  private populateProductAndCategories(purchases, t) {
    purchases.map(purchase => {

    })
  }

  private getCategories(purchase: Instance, t): Promise {

    return new (<any>Promise)(resolve => {
      let query = (purchase.categories || []).reduce((query, category) => {
        query.$or.push({name: category})
      }, {
        $or: []
      });

      if (!query.$or.length) {
        resolve([]);
      }
    })

  }

  private getProductModel(purchase) {
    return this.models.Product.findOrCreate({where: {name: purchase.product}, defaults: {name: purchase.product}})
  }

};
