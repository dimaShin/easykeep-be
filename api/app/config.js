/**
 * Created by iashindmytro on 10/24/16.
 */

const dbConfig = require('./db/dbConfig.js');

module.exports = function (env){
  return {
    db: dbConfig(env),
    env: env.NODE_ENV
  }
};