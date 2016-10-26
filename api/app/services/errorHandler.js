/**
 * Created by iashindmytro on 10/24/16.
 */
module.exports = function (err, req, res) {
  res.status(500);
  if (process.env.ENV === 'development') {
    res.send(err);
  } else {
    res.send();
  }
};