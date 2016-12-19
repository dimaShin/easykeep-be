module.exports = {
  basePath: '/api',
  routes: [
    {
      path: '/*',
      method: 'USE',
      handlers: [async (req, res, next) => {
        let token = req.header('authToken');
        let app = req.app;

        if (!token) {
          return res.sendStatus(401);
        }

        try {
          let session = await app.services.users.getMySession(token);

          if (!session) {
            res.sendStatus(401);
            return;
          }

          req.user = session.get('User');
          next();

        } catch (err) {
          console.log('catch error >>> ', err);
          res.sendStatus(401);
        }
      }]
    },

    {
      path: '/me',
      method: 'GET',
      handlers: [async (req, res) => {

        if (!req.user) {
          return res.sendStatus(401);
        }

        res.send(req.user);
      }]
    },

    {
      path: '/invoice',
      method: 'POST',
      handlers: [async (req, res) => {
        let body = req.body;
        let app = req.app;

        try {
          let invoice = await app.services.invoice.createInvoice(body);
          res.status(200).send(invoice);
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      }]
    }
  ]
};
