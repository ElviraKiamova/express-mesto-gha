const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new NotAuthorized('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new NotAuthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
