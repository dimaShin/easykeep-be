import {Request, Response} from "express-serve-static-core";
import {Application} from "../../types/app";
import Model = sequelize.Model;
import sequelize = require("sequelize");
import {Instance} from "../../types/Instance";
/**
 * Created by iashindmytro on 10/24/16.
 */

export default [{

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
   * @apiParam {sting} email User's email
   * @apiParam {string} password User's password
   *
   * @apiSampleRequest 127.0.0.1:3000/signin
   *
   * @apiSuccess {string} token Token for access to the API
   * @apiSuccess {json} user User model
   */

  method: 'POST',
  url: '/signin',
  handlers: [(req: Request, res: Response)=> {
    const app: Application = req.app;
    const body = req.body;
    const Session = app.dbClient.db.Session;

    if (!body.email || !body.password) {
      return res.sendStatus(401);
    }

    app.services.auth.verifyPassword(app, body)
      .then((user: Instance) => {
        return app.services.auth.startSession(user.get('id'), Session).
          then(session => {
            return { session, user: user.getPublicData() }
          });
      })
      .then(payload => {
        let token = payload.session.get('token');
        app.services.auth.addAuthHeader(res, token);
        res.send({token, user: payload.user});
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
      let mailerService = req.app.services.mailer;
      let authService = req.app.services.auth;

      req.app.services.data.user.create(data)
        .then((user: Instance) => {
          let token = authService.generateToken({
            userId: user.get('id')
          }, '7 days');
          mailerService.send({
            to: user.get('email'),
            subject: 'Confirm Registration',
            text: `http://localhost:4200/auth/confirm/${token}`,
            html: `<a href="http://localhost:4200/auth/confirm/${token}">Confirm your email</a>`
          });
          res.send(user.getPublicData());
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    }]
  },

  /**
   * @api {post} /token Verify token
   *
   * @apiDescription This route for checking token validity
   * All params must be in request body.
   *
   * @apiName Token
   * @apiGroup Auth
   *
   * @apiParam {sting} token Token
   *
   * @apiSampleRequest 127.0.0.1:3000/signup
   *
   * @apiSuccess {boolean} isValid result of checking.
   */

  {
    method: 'POST',
    url: '/token',
    handlers: [(req, res)=> {
      let data = req.body;

      req.app.services.auth.verifyToken(data.token, req.app)
        .then(() => res.send({isValid: true}))
        .catch(() => res.send({isValid: false}));
    }]
  },

];