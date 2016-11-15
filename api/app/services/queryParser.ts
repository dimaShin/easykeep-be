import {Request} from "../types/request";
import {Response} from "../types/response";
import {NextFunction} from "express-serve-static-core";

export default (req: Request, res: Response, next: NextFunction) => {

  if (!req.query.query) {
    next();
    return;
  }

  try {

    req.query.query = req.query.query.replace(/\$iLike\"\s*:\s*\"(\w*)/g, '$&%');
    req.query.query = JSON.parse(req.query.query);

  } catch (err) {
    res.status(400).send({ err, message: 'Query parse error' });
    return;
  }

  next();
};
