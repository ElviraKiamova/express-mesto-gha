const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized('Необходима авторизация'));
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new NotAuthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
