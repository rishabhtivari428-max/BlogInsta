import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useBlog } from '../hooks/useBlog'
import { deleteBlog, getBlogs } from '../services/blog.api'

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('myblogs')
    const [deleteLoading, setDeleteLoading] = useState(null)

    useEffect(() => {
        fetchUserBlogs()
    }, [])

    const fetchUserBlogs = async () => {
        try {
            setLoading(true)
            const response = await getBlogs()
            setBlogs(response.blog || [])
        } catch (error) {
            console.error("Error fetching blogs:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async(id) => {
        if(window.confirm("Are you sure you want to delete this blog?")) {
            setDeleteLoading(id)
            try {
                await deleteBlog(id)
                setBlogs(blogs.filter(blog => blog._id !== id))
            } catch (error) {
                console.error("Error deleting blog:", error)
            } finally {
                setDeleteLoading(null)
            }
        }
    }

    if(authLoading || loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    <p className="mt-4 text-white text-lg font-medium">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Please login to continue</h1>
                    <Link to="/login" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 mb-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                <span className="text-5xl font-bold text-white">{user.username?.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.username}</h1>
                                <p className="text-gray-600 text-lg">{user.email}</p>
                            </div>
                            <div className="flex gap-3">
                                <Link 
                                    to="/create"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
                                >
                                    ✍️ Write Blog
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
                                <div className="text-2xl font-bold text-blue-600">{blogs.length}</div>
                                <div className="text-sm text-gray-600 mt-1">My Blogs</div>
                            </div>
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 text-center border border-pink-200">
                                <div className="text-2xl font-bold text-pink-600">{user.followers?.length || 0}</div>
                                <div className="text-sm text-gray-600 mt-1">Followers</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                                <div className="text-2xl font-bold text-green-600">{user.following?.length || 0}</div>
                                <div className="text-sm text-gray-600 mt-1">Following</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('myblogs')}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                            activeTab === 'myblogs'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:text-indigo-600'
                        }`}
                    >
                        📝 My Blogs
                    </button>
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                            activeTab === 'followers'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:text-indigo-600'
                        }`}
                    >
                        👥 Followers
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                            activeTab === 'following'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:text-indigo-600'
                        }`}
                    >
                        ⭐ Following
                    </button>
                </div>

                {/* My Blogs Section */}
                {activeTab === 'myblogs' && (
                    <div className="space-y-4">
                        {blogs.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="text-6xl mb-4">📚</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No blogs yet</h2>
                                <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
                                <Link 
                                    to="/create"
                                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                                >
                                    Create Your First Blog
                                </Link>
                            </div>
                        ) : (
                            blogs.map((blog) => (
                                <div key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                                <p className="text-gray-600 line-clamp-2 mb-3">{blog.content}</p>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex gap-3 justify-end">
                                            <Link 
                                                to={`/edit/${blog._id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(blog._id)}
                                                disabled={deleteLoading === blog._id}
                                                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
                                            >
                                                {deleteLoading === blog._id ? '⏳ Deleting...' : '🗑️ Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Followers Section */}
                {activeTab === 'followers' && (
                    <div>
                        {user.followers && user.followers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.followers.map((follower) => (
                                    <div key={follower._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                                {follower.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{follower.username}</h3>
                                                <p className="text-sm text-gray-600">{follower.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="text-6xl mb-4">📭</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No followers yet</h2>
                                <p className="text-gray-600">Create amazing content to gain followers!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Following Section */}
                {activeTab === 'following' && (
                    <div>
                        {user.following && user.following.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.following.map((followee) => (
                                    <div key={followee._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                                                {followee.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{followee.username}</h3>
                                                <p className="text-sm text-gray-600">{followee.email}</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">
                                            Unfollow
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Not following anyone</h2>
                                <p className="text-gray-600">Discover interesting authors to follow!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard