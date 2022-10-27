const ErrorNotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');
const ForbiddenError = require('../errors/ForbiddenError');
const Cards = require('../models/card');

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      if (!card) {
        next(new DataIncorrect('Переданы некорректные данные'));
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataIncorrect('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound('Карточка не найдена'));
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect({ message: err.errorMessage }));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound('Карточка не найдена'));
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect({ message: 'Переданы некорректные данные' }));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { _id: userId } = req.user;
  Cards.findById(req.params.cardId)
    .orFail(new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      if (card) {
        if (card.owner.toString() === userId) {
          card.delete()
            .then(() => res.status(200).send({ message: 'Карточка удалена' }));
        } else {
          throw new ForbiddenError('Нельзя удалять чужую карточку');
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect({ message: 'Переданы некорректные данные' }));
        return;
      }
      next(err);
    });
};
