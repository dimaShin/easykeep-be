require('babel-core/register');
let http = require('http');
let app = require('./app');

http.createServer(app).listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Start listening on 3000');
  }
});