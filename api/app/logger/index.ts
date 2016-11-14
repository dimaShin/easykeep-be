import {Application} from "../types/app";
import e, {Request, Response, NextFunction} from 'express';

module.exports = (app : Application) => {
  if (app.config.env !== 'development') {
    return;
  }

  app['use']('/', (req: Request, resp: Response, next: NextFunction) : void => {

    console.log(`REQUEST: ${req.method}${req.baseUrl}`);
    console.log('params: ', req.params);
    console.log('body: ', req.body);
    next();

  });
};