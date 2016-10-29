/**
 * Created by iashindmytro on 10/24/16.
 */
let jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const salt = '$2a$10$qW2ph2b4phtZCY.FoVlpP.';
const secret = 'do-not-forget-to-change-this-in-prod';
const authHeaderKey = 'auth-token';

let actions = {

  hash: string => {
    return bcrypt.hashSync(string, salt);
  },

  startSession: (userId, Session) => {
    return Session.create({
      UserId: userId,
    }).then(model => {
      let token = jwt.sign({
        id: model.get('id'),
        userId: userId,
      }, secret, { expiresIn: '7 days' });
      model.set('token', token);
      return model.save();
    })
  },

  verifySession: (req, res, next) => {
    let token = req.header('auth-token');
    let verified = token && jwt.verify(token, secret);
    let app = req.app;

    if (!verified) {
      res.sendStatus(401);
    }

    app.dbClient.db.Session.findById(verified.id)
      .then(model => {
        if (!model) {
          res.send(401);
          return;
        }

        if (model.get('token') !== token || !model.get('active')) {
          res.sendStatus(401);
          return;
        }

        app.config.env === 'production' && model.set('active', false) && model.save();

        actions.startSession(model.get('UserId'), req.app.dbClient.db.Session)
          .then(model => {
            actions.addAuthHeader(res, model.get('token'));
            req.app.user = {id: model.get('userId')};
            next();
          });

      });
  },

  verifyToken: (token, app) => {
    return new Promise((resolve, reject) => {
      try {
        let verified = token && jwt.verify(token, secret);
        app.dbClient.db.Session.findById(verified.id)
          .then(session => {
            if (!session) {
              reject();
            }

            if (session.get('token') === token && session.get('active')) {
              resolve();
            } else {
              reject();
            }
          })
      } catch (err) {
        reject();
      }

    });

  },

  populateUser: (req, res, next) => {
    let userId = req.app.user.id;
    let User = req.app.dbClient.db.User;

    User.findById(userId)
      .then(model => {
        req.app.user = model;
        next();
      })
  },

  addAuthHeader: (res, token) => {
    console.log('adding auth header: ', token);
    res.header(authHeaderKey, token);
  },

  verifyPassword: (app, body) => {
    const User = app.dbClient.db.User;

    return new Promise((resolve, reject) => {
      if (!body.email || !body.password) {
        reject();
      }

      User.find({email: body.email})
        .then(user => {
          if (!user) {
            reject();
          }

          let password = user.get('password');
          let hashed = app.services.auth.hash(body.password);

          if (hashed === password) {
            resolve(user);
          } else {
            reject();
          }
        })
    })



  }
};

module.exports = actions;