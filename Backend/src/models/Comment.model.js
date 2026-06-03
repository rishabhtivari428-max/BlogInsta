const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        required: [true, "Blog is required"]
    },
    content: {
        type: String,
        required: [true, "Comment content is required"],
        minlength: [1, "Comment cannot be empty"],
        maxlength: [500, "Comment too long"]
    }
}, { timestamps: true })

const CommentModel = mongoose.model('comments', CommentSchema)

module.exports = CommentModel