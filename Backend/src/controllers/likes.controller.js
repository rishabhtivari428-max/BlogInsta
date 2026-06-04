const LikeModel = require('../models/Like.model')
const blogModel = require('../models/Blog.model')

async function likeBlog(req, res) {
    try {
        const blogId = req.params.id
        const userId = req.user._id

        const blogExists = await blogModel.findById(blogId)
        if (!blogExists) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        // ✅ Check if already liked
        const alreadyLiked = await LikeModel.findOne({ 
            blog: blogId, 
            user: userId 
        })

        if(alreadyLiked){
            return res.status(409).json({
                message: "Already liked"
            })
        }

        const like = await LikeModel.create({
            blog: blogId,
            user: userId
        })

        return res.status(201).json({
            message: "Blog liked successfully",
            like
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function dislikeBlog(req, res) {
    try {
        const blogId = req.params.id
        const userId = req.user._id

        const blogExists = await blogModel.findById(blogId)

        if (!blogExists) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        const dislike = await LikeModel.findOneAndDelete({
            blog: blogId,
            user: userId
        })

        if (!dislike) {
            return res.status(404).json({
                message: "Like not found"
            })
        }

        return res.status(200).json({
            message: "Blog disliked successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getallLikes(req, res) {
    try {
        const blogId = req.params.id

        const likes = await LikeModel.find({ blog: blogId })
            .populate('user', 'username avatar')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Likes fetched successfully",
            totalLikes: likes.length,
            likes
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    likeBlog,
    getallLikes,
    dislikeBlog
}