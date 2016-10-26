/**
 * Created by iashindmytro on 10/25/16.
 */

module.exports = [{
  url: '/api/accounts',
  method: 'POST',
  handlers: [
    (req, res) => {
      let app = req.app;
      let Account = app.dbClient.db.Account;
      let data = req.body;

      Account.create(data)
        .then(model => {
          model.addUser(app.user);
          res.send(model.toJSON());
        });
    }
  ]
}];