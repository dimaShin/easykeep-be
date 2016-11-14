import e = require("express");
import Response = e.Response;
import NextFunction = e.NextFunction;
import {Application} from "../types/app";
import Response = e.Response;
import NextFunction = e.NextFunction;
import bcrypt from 'bcrypt'
import Model = sequelize.Model;
import sequelize = require("sequelize");
import { Request } from "../types/request";
import Instance = sequelize.Instance;
import Response = e.Response;
import NextFunction = e.NextFunction;

let jwt = require('jsonwebtoken');


const salt = '$2a$10$qW2ph2b4phtZCY.FoVlpP.';
const secret = 'do-not-forget-to-change-this-in-prod';
const authHeaderKey = 'auth-token';

export interface AuthService {
  hash: (s: string) => string;
  startSession: (userId: string, Session) => Promise<Instance>;
  generateToken: (payload: {id?: string, userId: string}, expired: string | number) => string;
  verifySession: (req: Request, res: Response, next: NextFunction) => void;
  populateUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyToken: (token: string, app) => Promise<void>;
  addAuthHeader: (res: Response, token: string) => {};
  verifyPassword: (app, body) => Promise<Instance | void>;
}

let actions: AuthService = {

  hash: string => {
    return bcrypt.hashSync(string, salt);
  },

  startSession: (userId: string, Session) => {
    return Session.create({
      UserId: userId,
    }).then(model => {
      let token = actions.generateToken({
        id: model.get('id'),
        userId: 'userId'
      }, '7 days');

      model.set('token', token);
      return model.save();
    })
  },

  generateToken(data: {userId: string}, expiresIn: string | number) : string {
    return jwt.sign(data, secret, { expiresIn });
  },

  verifySession: (req: Request, res: Response, next: NextFunction) => {
    let token = req.header('auth-token');
    let verified = token && jwt.verify(token, secret);
    let app: Application = req.app;

    if (!verified) {
      res.sendStatus(401);
    }

    app.dbClient.db.Session.findById(verified.id)
      .then((model: Instance) => {
        if (!model) {
          res.send(401);
          return;
        }

        if (model.get('token') !== token || !model.get('active')) {
          res.sendStatus(401);
          return;
        }

        app.config.env === 'production' && model.set('active', false) && model.save();

        actions.startSession(model.get('UserId'), app.dbClient.db.Session)
          .then((session: Instance) => {
            actions.addAuthHeader(res, session.get('token'));
            req.user = {id: session.get('UserId')};
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

  populateUser: (req: Request, res: Response, next: NextFunction) => {
    let userId: string = (req.user as {id: string}).id;
    let app: Application = req.app;
    let User = app.dbClient.db.User;

    User.findById(userId)
      .then((model: Instance) => {
        req.user = model;
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

export default actions;