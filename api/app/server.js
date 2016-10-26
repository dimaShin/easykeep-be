/**
 * Created by iashindmytro on 10/23/16.
 */
let http = require('http');
let app = require('./index');

console.log(process.env.NODE_ENV);

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port: ' + (process.env.PORT || 3000));
});