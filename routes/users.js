const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../middlewares/validation');

const {
  getUser,
  getUserId,
  updateUserInfo,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

router.get('/', auth, getUser);
router.get('/:userId', auth, parameterIdValid('userId'), getUserId);
router.patch('/me', auth, userValid, updateUserInfo);
router.patch('/me/avatar', userAvatarValid, updateAvatar);
router.get('/me', auth, getUserMe);

module.exports = router;
