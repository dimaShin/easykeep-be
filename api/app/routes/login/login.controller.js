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
   * @apiSuccess {json} user User model
   */

  method: 'POST',
  url: '/signin',
  handlers: [(req, res)=> {
    const app = req.app;
    const body = req.body;
    const Session = app.dbClient.db.Session;

    if (!body.name || !body.password) {
      return res.sendStatus(401);
    }

    app.services.auth.verifyPassword(app, body)
      .then(user => {
        return app.services.auth.startSession(user.get('id'), Session).
          then(session => { return { session ,user } });
      }).then(payload => {

      res.send({
        user: payload.user,
        token: payload.session.get('token')
      })
    }).catch(() => res.sendStatus(401));

  }],

  },

  /**
   * @api {post} /signup Register new user in the system
   *
   * @apiDescription This route for registration
   * All params must be in request body.
   * Account will be created and assigned as defaultAccount with created user.
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