const router = require('express').Router();
const {
    getUsers,
    getSingleUser, 
    addUser, 
    deleteUser, 
    updateUser, 
    addFriend
} = require('../../controllers/userController');

// api/users/ end route

router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/friend/:friendId').put(addFriend);

module.exports = router;