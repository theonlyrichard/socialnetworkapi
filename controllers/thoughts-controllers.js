const { thoughts, users } = require("../models");

const thoughtsController = {

    //create new thought
    createThoughts({ params, body }, res) {
        thoughts.create(body)
            .then(({ _id }) => {
                return users.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts on this ID" });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },

    // get available thoughts
    getAllThoughts(req, res) {
        thoughts.find({})
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);

            });
    },

    //get thought by ID
    getThoughtsById({ params }, res) {
        thoughts.findOne({ _id: params.id })
            .populate({ path: "reactions", select: "-__v" })
            .then(dbThoughtsData => {
                if (dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts on this ID" })
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //update current thoughts
    updateThoughts({ params, body }, res) {
        thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts on this ID" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    // delete thought
    deleteThoughts({ params }, res) {
        thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => {
                if (dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts on this Id" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add new reaction
    addReaction({ params, body }, res) {
        thoughts.findOneAndUpdate({ _id: params.thoughtId }, { push: { reaction: body } }, { new: true, runValidators: true })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts on this ID" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err))
    },

    //delete reaction
    deleteReaction({ params }, res) {
        thoughts.findOneAndUpdate({ _id: params.toughtId }, { $pull: { reactions: { reactionID } } }, { new: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "No thought" })
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtsController