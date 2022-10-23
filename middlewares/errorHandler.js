const errorHandler = (err, req, res, next) => {
  const { message } = err;
  const status = err.statusCode || 500;

  res.status(status).send({ message });
  next();
};

module.exports = errorHandler;
