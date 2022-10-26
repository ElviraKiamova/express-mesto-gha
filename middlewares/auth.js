const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

const extractBearerToken = (header) => {
  header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized('Необходима авторизация'));
  }
  // const token = String(req.headers.authorization).replace('Bearer ', '');

  const token = extractBearerToken(authorization);

  let payload;

  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new NotAuthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
