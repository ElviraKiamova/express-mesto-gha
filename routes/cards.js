const router = require('express').Router();

const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard } = require("../controllers/cards");

router.get("/", getCard);
router.post("/", createCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.delete("/:cardId", deleteCard);

module.exports = router;

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.
