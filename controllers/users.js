const User = require('../models/user');
const NotFound = require('../errors/NotFound');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch(() => res.status(500).send({
      message: 'Ошибка по-умолчанию',
    }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные',
          });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.errorMessage,
        });
      }
      return res.status(500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.errorMessage,
        });
      }
      return res.status(500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({
          message: err.errorMessage,
        });
      }
      return res.status(500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};
