const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        required: [true, "Blog is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    }
}, { timestamps: true })

LikeSchema.index({ blog: 1, user: 1 }, { unique: true })

const LikeModel = new mongoose.model('likes', LikeSchema)

module.exports = LikeModel