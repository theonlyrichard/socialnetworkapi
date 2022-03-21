const { users } = require("../models");

//set up controller for users
const usersController = {
    //new user
    createUsers({ body }, res) {
        users.create(body)
            .then(dbUserData => res.json(dbUsersData))
            .cath(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res) {
        users.find({})
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .cath(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getUsersByID({ params }, res) {
        user.findOne({ _id: params.id })
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Unknown ID" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //update user by ID
    updateUsers({ params, body }, res) {
        users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: " Unknown ID" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    deleteUsers({ params }, res) {
        users.findOneAndDelete({ _id: params, id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Unknown ID" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete friend
    deleteFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendID } }, { new: true })
            .populate({ path: "friends", select: "-__v" })
            .select("-__V")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Unknown ID" });
                    return;
                }
                res.json(dbUserData);

            })
            .catch(err => res.status(400).json(err));
    },

    //addFriend
    addFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.id }, { push: { friends: params.friendID } }, { new: true })
            .populate({ path: "friends", select: ("-__v") })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Unknown ID" })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }

};

module.exports = usersController;