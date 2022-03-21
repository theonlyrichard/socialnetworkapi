// require Mongoose
const { Schema, model } = require("mongoose");

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate correct email
            match: [/?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// total friend count
UsersSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const Users = model('Users', UsersSchema);

module.exports = Users;