const router = require('express').Router();

const {
  getUser,
  getUserId,
  updateUserInfo,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUserMe);
module.exports = router;
