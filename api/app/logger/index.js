/**
 * Created by iashindmytro on 10/24/16.
 */
module.exports = app => app.use('*', (req, resp, next) => {
  console.warn(`REQUEST: ${req.method}${req.baseUrl}`);
  console.info('params: ', req.params);
  console.error('body: ', req.body);
  next();
});