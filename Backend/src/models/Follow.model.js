const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Following is required"]
    }
}, {timestamps: true})

followSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = new mongoose.model('follow', followSchema)

module.exports = followModel