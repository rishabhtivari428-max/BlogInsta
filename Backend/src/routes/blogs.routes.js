const express = require('express')
const blogRouter = express.Router()
const { likeBlog, getallLikes, dislikeBlog } = require('../controllers/likes.controller')
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/follow.controller')
const { createBlog, getBlog, updateBlog, deleteBlog, getAllBlogs, searchBlogs } = require('../controllers/blog.controller')
const { addComment, deleteComment, getComments } = require('../controllers/comment.controller')
const identifyUser = require('../middleware/auth.middleware')

blogRouter.post('/create', identifyUser, createBlog)

blogRouter.get('/get', identifyUser, getBlog)

blogRouter.get('/getall', getAllBlogs)

blogRouter.patch('/update/:id', identifyUser, updateBlog)

blogRouter.delete('/delete/:id', identifyUser, deleteBlog)

blogRouter.get('/search', searchBlogs)

blogRouter.post('/like/:id', identifyUser, likeBlog)

blogRouter.get('/getalllikes/:id', identifyUser, getallLikes)

blogRouter.delete('/dislike/:id', identifyUser, dislikeBlog)

blogRouter.post('/addcomment/:id', identifyUser, addComment)

blogRouter.get('/getcomments/:id', getComments)

blogRouter.delete('/deletecomment/:id', identifyUser, deleteComment)

blogRouter.post('/follow/:id', identifyUser, followUser)

blogRouter.delete('/unfollow/:id', identifyUser, unfollowUser)

blogRouter.get('/getfollowers/:id', getFollowers)

blogRouter.get('/getfollowing/:id', getFollowing)

module.exports = blogRouter