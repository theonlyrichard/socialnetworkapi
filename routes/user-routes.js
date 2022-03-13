const router = require("express").router();

//requirements
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require("../../controllers/users-controller");

router.route("/").get(getAllUsers).post(createUsers);

router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteFriend);

router.route("/id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;