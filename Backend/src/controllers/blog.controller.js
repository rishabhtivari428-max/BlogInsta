const blogModel = require('../models/Blog.model')

async function createBlog(req, res) {
    try {
        const { title, content, author } = req.body

        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const blog = await blogModel.create({
            title,
            content,
            author: req.user._id
        })

        return res.status(201).json({
            message: "Blog created successfully",
            blog
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getBlog(req, res) {
    try {
        const blog = await blogModel.find({ author: req.user._id })
            .populate('author', 'username avatar')
            .sort({ createdAt: -1 })

        if (blog.length === 0) {
            return res.status(404).json({
                message: "No blogs found"
            })
        }

        return res.status(200).json({
            message: "Blogs fetched successfully",
            blog
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await blogModel.find()
            .populate('author', 'username avatar')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Blogs fetched successfully",
            blogs
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function updateBlog(req, res) {
    try {
        const id = req.params.id
        const { title, content } = req.body

        const blog = await blogModel.findByIdAndUpdate(id, { title, content }, { new: true })

        if (!blog) {
            return res.status(409).json({
                message: "Unable to update blog"
            })
        }

        return res.status(200).json({
            message: "Blog updated successfully",
            blog
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function deleteBlog(req, res) {
    try {
        const id = req.params.id

        const blog = await blogModel.findByIdAndDelete({ _id: id })

        if (!blog) {
            return res.status(409).json({
                message: "Unable to delete blog"
            })
        }

        return res.status(200).json({
            message: "Blog deleted successfully"
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function searchBlogs(req, res) {
    try {
        const { query } = req.query
        
        const blogs = await blogModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        })
        .populate('author', 'username avatar')
        .sort({ createdAt: -1 })
        
        return res.status(200).json({
            message: "Search results",
            blogs
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    createBlog,
    getBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    searchBlogs
}