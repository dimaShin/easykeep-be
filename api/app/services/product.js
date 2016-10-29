

module.exports = class ProductService {

  constructor(app) {
    this.app = app;
    this.models = app.dbClient.db;
  }

  create(data) {
    let product;

    return this.models.Product.create({name: data.name})
      .then(created => {
        product = created;
        return this.populateAssociations(data);
      })
      .then(payload => {
        let [categories, measure] = payload;

        if (categories && categories.length) {
          product.addCategories(categories);
        }

        if (measure) {
          product.setMeasure(measure);
        }

        return product.save()
          .then(model => Object.assign(
            {}, model.get({ plain: true }), {
              categories: categories && categories.map(category => category.get({plain: true})) || [],
              measure: measure && measure.get({plain: true}) || null
            }
          ));
      });
  }

  populateAssociations(data) {

    return Promise.all([
      this.getCategories(data.categories),
      this.getMeasure(data.measure)
    ]);

  }

  getCategories(categories) {
    console.log('populating categories: ', categories);
    if (!categories || !categories.length) {
      return;
    }
    return Promise.all(
      categories.map(
        category => this.models.Category.findOrCreate(
          { where: category, defaults: category }
        ).spread(category => {
          console.log('got category: ', category);
          return category;
        })
      )
    );
  }

  getMeasure(measure) {
    if (!measure || !measure.name) {
      return;
    }
    return this.models.Measure.findOrCreate(
      {where: measure, defaults: measure}
    ).spread(measure => {
      console.log('got measure: ', measure.get({plain: true}));
      return measure
    });
  }

};