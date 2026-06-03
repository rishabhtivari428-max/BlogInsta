import React, { useState, useEffect } from 'react'

const LikesPage = () => {
    const [likedBlogs, setLikedBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Fetch user's liked blogs from API
        setLoading(false)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">❤️ Liked Blogs</h1>

                {likedBlogs.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">💔</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No liked blogs yet</h2>
                        <p className="text-gray-600">Start liking blogs to see them here!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {likedBlogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                        <p className="text-gray-600 mb-3">{blog.content.substring(0, 100)}...</p>
                                    </div>
                                    <button className="text-3xl hover:scale-125 transition">❤️</button>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>By {blog.author?.username}</span>
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LikesPage
