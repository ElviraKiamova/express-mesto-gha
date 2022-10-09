const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  ERR_500,
  ERR_404,
  ERR_400,
} = require('../errors/errorСodes');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch(() => res.status(ERR_500).send({
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
          .status(ERR_400)
          .send({
            message: 'Переданы некорректные данные',
          });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({
          message: err.errorMessage,
        });
      }
      return res.status(ERR_500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(ERR_500).send({
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
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({
          message: err.errorMessage,
        });
      }
      return res.status(ERR_500).send({
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
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({
          message: err.errorMessage,
        });
      }
      return res.status(ERR_500).send({
        message: 'Ошибка по-умолчанию',
      });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
