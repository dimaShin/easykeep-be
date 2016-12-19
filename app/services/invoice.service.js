module.exports = class UserService {
  services;

  constructor(services) {
    this.services = services;
  }

  async createInvoice(data) {
    const models = this.services.db.models;
    const transaction = await this.services.db.startTransaction();

    const groupedProducts = UserService._groupProducts(data.products);

    const products = [].concat(...await Promise.all([
      this._createProducts(groupedProducts.toCreate, transaction),
      this._findProducts(groupedProducts.toFind, transaction)
    ])).filter(Boolean);

    if (products.length !== data.products.length) {
      throw {
        message: `Failed to to associate some products, ${data.products.length - products.length}`,
        products
      }
    }

    const invoice = await models.Invoices.create({
      place: data.place
    }, { transaction });

    await models.InvoicesProducts.bulkCreate(products.map(product => {
      const productData = data.products.find(pr => {
        return (pr.id && product.get('id') === pr.id) || (pr.name && pr.name === product.name)
      });

      return {
        ProductId: product.get('id'),
        InvoiceId: invoice.get('id'),
        quantity: productData.quantity,
        cost: productData.cost,
        price: productData.price
      }
    }), { transaction, returning: true });

    await transaction.commit();

    return models.Invoices.findById(invoice.get('id'), {include: [models.Products]});
  }

  _createProducts(products, transaction) {
    return this.services.db.models.Products.bulkCreate(products, { transaction, returning: true });
  }

  _findProducts(products, transaction) {
    return this.services.db.models.Products.find({
      where: {
        id: {
          $in: products.reduce((ids, product) => {
            ids.push(product.id);
            return ids;
          }, [])
        }
      },
      transaction
    })
  }

  static _groupProducts(products) {
    return products.reduce((collection, product) => {
      if (!product.id) {
        collection.toCreate.push({name: product.name});
      } else {
        collection.toFind.push({id: product.id});
      }

      return collection;
    }, {
      toCreate: [],
      toFind: []
    });
  }
};

