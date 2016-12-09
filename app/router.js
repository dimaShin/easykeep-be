let express = require('express');
let ocrRoutes = require('./routes/ocr.routes');
let authRoutes = require('./routes/auth.routes');

let router = express.Router();

[
  ocrRoutes,
  authRoutes
].forEach(routes => {
  routes.routes.forEach((route) => {
    router[route.method.toLowerCase()](routes.basePath + route.path, route.handlers);
  });
});

module.exports = router;

