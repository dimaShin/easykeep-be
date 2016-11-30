import Request = e.Request;
import Response = e.Response;
import e = require("express");
import {Application} from "../../types/app";

export default [{
  url: '/api/accounts',
  method: 'POST',
  handlers: [
    (req: Request, res: Response) => {
      let app: Application = req.app;
      let Account = app.dbClient.db.Account;
      let data = req.body;

      Account.create(data)
        .then(model => {
          model.addUser(app.user);
          res.send(model.toJSON());
        });
    }
  ]
}];