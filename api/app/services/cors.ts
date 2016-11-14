import e = require("express");
import {Response} from "../types/response";
module.exports = (req: e.Request, res: Response, next: e.NextFunction) => {

  console.log('cors working');

  res.header("Access-Control-Allow-Origin", req.headers['origin']);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Max-Age", '86400');
  res.header("Access-Control-Allow-Headers", 'auth-token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header("access-control-expose-headers", 'auth-token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  req.method === 'OPTIONS'
    ? res.end()
    : next();

};