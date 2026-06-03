import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getAllLikes, likeBlog, dislikeBlog, getComments, addComment, deleteComment } from '../services/blog.api'

const BlogDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)
    const [loadingLike, setLoadingLike] = useState(false)

    useEffect(() => {
        // Get blog from location state
        const state = window.history.state
        if (state?.usr?.blog) {
            setBlog(state.usr.blog)
            setLoading(false)
            fetchLikesAndComments(state.usr.blog._id)
        } else {
            // Fallback - navigate back if no blog data
            navigate('/home')
        }
    }, [id, navigate])

    const fetchLikesAndComments = async (blogId) => {
        try {
            const likesData = await getAllLikes(blogId)
            setLikes(likesData.likes || [])
            
            const commentsData = await getComments(blogId)
            setComments(commentsData.comments || [])

            if (user) {
                setIsLiked(likesData.likes?.some(like => like.user._id === user.id))
            }
        } catch (err) {
            console.error('Error fetching likes/comments:', err)
        }
    }

    const handleLike = async () => {
        if (!user) {
            alert('Please login to like blogs')
            return
        }

        setLoadingLike(true)
        try {
            if (isLiked) {
                await dislikeBlog(id)
                setLikes(likes.filter(like => like.user._id !== user.id))
                setIsLiked(false)
            } else {
                await likeBlog(id)
                const likesData = await getAllLikes(id)
                setLikes(likesData.likes || [])
                setIsLiked(true)
            }
        } catch (err) {
            console.error('Error toggling like:', err)
        } finally {
            setLoadingLike(false)
        }
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if (!commentText.trim()) return
        if (!user) {
            alert('Please login to comment')
            return
        }

        setLoadingComment(true)
        try {
            await addComment(id, commentText)
            setCommentText('')
            const commentsData = await getComments(id)
            setComments(commentsData.comments || [])
        } catch (err) {
            console.error('Error adding comment:', err)
            alert('Failed to add comment')
        } finally {
            setLoadingComment(false)
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return

        try {
            await deleteComment(commentId)
            const commentsData = await getComments(id)
            setComments(commentsData.comments || [])
        } catch (err) {
            console.error('Error deleting comment:', err)
            alert('Failed to delete comment')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-700 text-lg font-medium">Loading blog...</p>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog not found</h1>
                    <button 
                        onClick={() => navigate('/home')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Blog Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            {blog.author && (
                                <>
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {blog.author.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{blog.author.username}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Blog Content */}
                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</p>
                        </div>

                        {/* Like Button */}
                        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                            <button 
                                onClick={handleLike}
                                disabled={loadingLike}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                                    isLiked 
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } disabled:opacity-50`}
                            >
                                <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
                                {likes.length > 0 ? `${likes.length} ${likes.length === 1 ? 'Like' : 'Likes'}` : 'Like'}
                            </button>
                            <span className="text-gray-600 font-medium">{comments.length} Comments</span>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

                        {/* Add Comment Form */}
                        {user ? (
                            <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b border-gray-200">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {user.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Write a comment..."
                                        rows="3"
                                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="submit"
                                        disabled={loadingComment || !commentText.trim()}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
                                    >
                                        {loadingComment ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mb-8 pb-8 border-b border-gray-200 text-center">
                                <p className="text-gray-600 mb-4">Please login to comment</p>
                            </div>
                        )}

                        {/* Comments List */}
                        {comments.length === 0 ? (
                            <p className="text-gray-600 text-center py-8">No comments yet. Be the first to comment!</p>
                        ) : (
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment._id} className="flex gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {comment.user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-bold text-gray-800">{comment.user?.username}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <p className="text-gray-700 mb-3">{comment.content}</p>
                                            {user && comment.user._id === user.id && (
                                                <button 
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-semibold transition"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails
