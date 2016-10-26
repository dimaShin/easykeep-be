/**
 * Created by iashindmytro on 10/24/16.
 */

module.exports = [{

  /**
   * @api {post} /signin Login into the system
   *
   * @apiDescription This route is for login.
   * All params must be in request body.
   *
   *
   * @apiName Sign In
   * @apiGroup Auth
   *
   * @apiParam {sting} name User's name
   * @apiParam {string} password User's password
   *
   * @apiSampleRequest 127.0.0.1:3000/signin
   *
   * @apiSuccess {string} token Token for access to the API
   */

  method: 'POST',
  url: '/signin',
  handlers: [(req, res)=> {
    const app = req.app;
    const body = req.body;
    const User = app.dbClient.db.User;
    const Session = app.dbClient.db.Session;

    if (!body.name || !body.password) {
      return res.sendStatus(401);
    }

    User.find({name: body.name})
      .then(model => {
        if (!model) {
          return res.sendStatus(401);
        }

        let password = model.get('password');
        let hashed = req.app.services.auth.hash(body.password);

        if (hashed === password) {
          req.app.services.auth.startSession(model.get('id'), Session)
            .then(session => res.send({
              token: session.get('token')
            }))
        } else {
          res.sendStatus(401);
        }
      })
    }],
  },

  /**
   * @api {post} /signup Register new user in the system
   *
   * @apiDescription This route for registration
   * All params must be in request body.
   * Account will be created and assigned as defaultAccount with this user created by this route.
   * Account name will be ${username} - default account.
   *
   * @apiName Sign Up
   * @apiGroup Auth
   *
   * @apiParam {sting} name User's name.
   * @apiParam {string} password User's password.
   *
   * @apiSampleRequest 127.0.0.1:3000/signup
   *
   * @apiSuccess {JSON} user Newly created user's instance.
   */

  {
    method: 'POST',
    url: '/signup',
    handlers: [(req, res)=> {
      let data = req.body;

      req.app.services.user.create(data)
        .then(user => res.send(user.toJSON()))
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    }]
  }
];