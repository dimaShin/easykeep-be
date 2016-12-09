module.exports = {
  basePath: '/auth',
  routes: [

    {
      path: '/facebook',
      method: 'POST',
      handlers: [async (req, res) => {
        let app = req.app;
        let facebook = app.services.facebook;
        let body = req.body;

        try {
          let me = await facebook.getMe(body.accessToken);
          let fbAccount = await app.services.users.getFacebookAccount(
            { fbUserId: me.id },
            {
              fbUserId: me.id,
              User: {
                name: me.name
              }
          });
          let session = await app.services.users.getSession(fbAccount.get('UserId'));
          res.send(session.get('token'));
        } catch (err) {
          console.log('catch error >>> ', err);
          res.status(400).send(err);
        }

      }]
    }
  ]
};

