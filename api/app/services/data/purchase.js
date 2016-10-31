

module.exports = class PurchaseService {

  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  create(data) {
    let relations = [];

    data.marketplace && relations.push(this.getMarketplaceModel(data.marketplace));

  }




  getMarketplaceModel(marketplace) {
    return this.models.Marketplace.findOrCreate(
      { where: {name: marketplace} }
    );
  }

};
