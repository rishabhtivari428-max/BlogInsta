const CommentModel = require('../models/Comment.model')
const blogModel = require('../models/Blog.model')

async function addComment(req, res){
    try {
        const { content } = req.body 
        const blogId = req.params.id 
        const userId = req.user._id 

        if(!content){
            return res.status(400).json({
                message: "Comment cannot be empty"
            })
        }

        if(!blogId || !userId){
            return res.status(400).json({
                message: "Blog or User not found"
            })
        }

        const blogExists = await blogModel.findById(blogId)

        if(!blogExists){
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        const comment = await CommentModel.create({
            blog: blogId,
            user: userId,
            content
        })

        return res.status(201).json({
            message: "Comment created successfully",
            comment
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function deleteComment(req, res){
    try {
        const commentId = req.params.id
        const userId = req.user._id

        const removeComment = await CommentModel.findOneAndDelete({
            _id: commentId,
            user: userId  
        })

        if(!removeComment){
            return res.status(404).json({
                message: "Comment not found or unauthorized"
            })
        }
        
        return res.status(200).json({
            message: "Comment deleted successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getComments(req, res){
    try {
        const blogId = req.params.id

        const comments = await CommentModel.find({ blog: blogId })
            .populate('user', 'username avatar')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Comments fetched successfully",
            totalComments: comments.length,
            comments
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    addComment,
    deleteComment,
    getComments
}