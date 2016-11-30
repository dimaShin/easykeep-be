/**
 * Created by iashindmytro on 10/24/16.
 */

import dbConfig from './db/dbConfig.js';

export default (env) => {
  return {
    db: dbConfig(env),
    env: env.NODE_ENV
  }
};