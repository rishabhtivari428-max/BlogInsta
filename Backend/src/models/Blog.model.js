const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true})

const BlogModel = new mongoose.model('blogs', BlogSchema)

module.exports = BlogModel