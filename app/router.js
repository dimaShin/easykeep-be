let express = require('express');
let ocrRoutes = require('./routes/ocr.routes');
let authRoutes = require('./routes/auth.routes');
let apiRoutes = require('./routes/api.routes');

let router = express.Router();

[
  ocrRoutes,
  authRoutes,
  apiRoutes
].forEach(routes => {
  routes.routes.forEach((route) => {
    router[route.method.toLowerCase()](routes.basePath + route.path, route.handlers);
  });
});

module.exports = router;

