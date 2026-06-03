import React, { useState, useEffect } from 'react'

const CommentsPage = () => {
    const [userComments, setUserComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Fetch user's comments from API
        setLoading(false)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">💬 My Comments</h1>

                {userComments.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">🗨️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No comments yet</h2>
                        <p className="text-gray-600">Start commenting on blogs to see them here!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {userComments.map((comment) => (
                            <div key={comment._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        On: <span className="font-semibold text-gray-700">{comment.blog?.title}</span>
                                    </p>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{comment.content}</p>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    <button className="text-red-500 hover:text-red-700 font-semibold transition">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentsPage
