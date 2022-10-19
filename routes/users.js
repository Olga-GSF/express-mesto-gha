const router = require('express').Router();
const {
  createUser, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/', getUser);

router.get('/:userId', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
