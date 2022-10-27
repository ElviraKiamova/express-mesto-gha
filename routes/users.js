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

router.get('/me', getUserMe);
router.get('/:userId', parameterIdValid('userId'), getUserId);
router.get('/', getUser);
router.patch('/me/avatar', userAvatarValid, updateAvatar);
router.patch('/me', auth, userValid, updateUserInfo);

module.exports = router;
