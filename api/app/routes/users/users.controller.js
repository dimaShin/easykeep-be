/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = [{
  method: 'GET',
  url: '/api/users',
  handlers: [(req, res)=> {
    req.app.dbClient.db.User.findAll()
      .then(collection => {
        res.status(200);
        res.send(collection);
      })
  }],
}, {
  method: 'POST',
  url: '/api/users',
  handlers: [(req, res)=> {
    let User = req.app.dbClient.db.User;
    let data = req.body;

    User.create(data)
      .then(model => res.send(model.toJSON()))
      .catch(err => {
        res.status(400);
        res.send(err);
      });
  }]
}];