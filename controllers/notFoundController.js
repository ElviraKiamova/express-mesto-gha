const ErrorNotFound = require('../errors/NotFound');

const notFoundController = (req, res, next) => {
  next(new ErrorNotFound({ message: 'Данный путь не найден' }));
};

module.exports = notFoundController;
