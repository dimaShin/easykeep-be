import {Request} from "../types/request";
import {Response} from "../types/response";

module.exports = function (req: Request, res: Response) {
  res.sendStatus(404);
};