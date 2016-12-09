let express = require('express');
let ocrRoutes = require('./routes/ocr.routes');

let router = express.Router();

[
  ocrRoutes
].forEach(routes => {
  routes.routes.forEach((route) => {
    router[route.method.toLowerCase()](routes.basePath + route.path, route.handlers);
  });
});

module.exports = router;

