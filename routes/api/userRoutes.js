const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addReaction,
  removeReaction,
  addFriend,

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/reactions
router.route('/:userId/reactions').post(addReaction);

// /api/users/:userId/reactions/:reactionId
router.route('/:userId/reactions/:reactionId').delete(removeReaction);

router.route('/:userId/friends/').put(addFriend);

// router.route('/:userId/friends/:friendId').delete(removeFriend)



module.exports = router;
