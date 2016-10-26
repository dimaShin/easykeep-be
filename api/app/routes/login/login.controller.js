/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = [{
  method: 'POST',
  url: '/signin',
  handlers: [(req, res)=> {
    const app = req.app;
    const body = req.body;
    const User = app.dbClient.db.User;
    const Session = app.dbClient.db.Session;
    console.log('got body: ', body);
    if (!body.name || !body.password) {
      return send401(res);
    }

    User.find({name: body.name})
      .then(model => {
        if (!model) {
          return send401(res);
        }

        let password = model.get('password');
        let hashed = req.app.services.auth.hash(body.password);
        console.log('hashed: ', hashed);
        if (hashed === password) {
          req.app.services.auth.startSession(model.get('id'), Session)
            .then(session => res.send({
              token: session.get('token')
            }))
        } else {
          send401(res);
        }
      })
    }],
  },
  {
    method: 'POST',
    url: '/signup',
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
  }
];

function send401 (res) {
  res.status(401);
  res.send();
}