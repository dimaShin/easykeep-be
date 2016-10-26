module.exports = (req, res, next) => {

  if (!req.query.query) {
    next();
    return;
  }

  try {

    req.query.query = req.query.query.replace(/\$iLike\"\s*:\s*\"(\w*)/g, '$&%');
    req.query.query = JSON.parse(req.query.query);

  } catch (err) {
    res.sendStatus(400);
    return;
  }

  next();
};
