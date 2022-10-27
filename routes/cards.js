const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createCardValid,
  parameterIdValid,
} = require('../middlewares/validation');

const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCardValid, createCard);
router.put('/:cardId/likes', parameterIdValid('cardId'), likeCard);
router.delete('/:cardId/likes', parameterIdValid('cardId'), dislikeCard);
router.delete('/:cardId', parameterIdValid('cardId'), deleteCard);

module.exports = router;
