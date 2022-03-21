const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
const { truncate } = require("fs");

// thoughts schema
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlegth: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// ReactionsSchema
const ReactionsSchema = new Schema(
    {
        // Set custom ID 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)









ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;