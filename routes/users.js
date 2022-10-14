const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUserId,
  updateUserInfo,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

function validate(url) {
  const regex = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Невалидная ссылка');
}

module.exports = { validate };

router.get('/', getUser);
router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validate),
  }),
}), updateAvatar);

module.exports = router;
