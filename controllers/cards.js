const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');

const {
  ERR_500,
  ERR_404,
  ERR_400,
} = require('../errors/errorСodes');

module.exports.getCard = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERR_500).send({ message: 'Ошибка по-умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERR_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERR_500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERR_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Карточка не найдена' });
      }
      return res.status(ERR_500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERR_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Карточка не найдена' });
      }
      return res.status(ERR_500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка не найдена'));
      }
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect({ message: 'Переданы некорректные данные' }));
      }
      next(err);
    });
};
