module.exports = {
  basePath: '/ocr',
  routes: [
    /**
     * Temporarily broken
     * ToDo: fix problem with loading from uploaded image
     * ToDo: improve quality of parsing
     * **/

    {
      path: '/',
      method: 'POST',
      handlers: [async (req, res) => {
        let app = req.app;
        let ocr = app.services.ocr;
        let body = req.body;

        console.log('got body: ', body);

        try {
          let text = await ocr.getTextFromUrl(body);
          res.send(text);
        } catch (err) {
          res.status(400).send(err);
        }

      }]
    }
  ]
};
