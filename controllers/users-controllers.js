const { users } = require("../models");

//set up controller for users
const usersController = {
    //new user
    createUsers({ body }, res) {
        users.create(body)
            .then(dbUserData => res.json(dbUsersData))
            .cath(err => res.status(400).json(err));
    }
},

    // get all users
    getAllUsers(req, res) {
        users.find({})
            .populate({ path: "thoughts", select: "-_v" })
            .populate({ path: "friends", select: "-_v" })
            .select("-_v")
            .then(dbUserData => res.json(dbUserData))
            .cath(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }