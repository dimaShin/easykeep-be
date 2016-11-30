/**
 * Created by iashindmytro on 11/8/16.
 */
let http = require('http');
let PORT: number = process.env.PORT || 3000;

http.createServer(() => {}).listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});