const router = require('express').Router();
const {
  getUser,
  getUserId,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.