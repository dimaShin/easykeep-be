/**
 * Created by iashindmytro on 10/24/16.
 */
let jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const salt = '$2a$10$qW2ph2b4phtZCY.FoVlpP.';
const secret = 'do-not-forget-to-change-this-in-prod';

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
            res.header('auth-token', model.get('token'));
            req.app.user = {id: model.get('userId')};
            next();
          });

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
  }
};

module.exports = actions;