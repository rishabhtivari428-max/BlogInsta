import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

const FollowsPage = () => {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('following')
    const [searchTerm, setSearchTerm] = useState('')

    const followers = user?.followers || []
    const following = user?.following || []

    const filteredFollowers = followers.filter(f => 
        f.username?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredFollowing = following.filter(f => 
        f.username?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Please login first</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">👥 Connections</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input 
                        type="text"
                        placeholder="Search followers or following..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 bg-white"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                            activeTab === 'following'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:text-indigo-600'
                        }`}
                    >
                        ⭐ Following ({filteredFollowing.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                            activeTab === 'followers'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:text-indigo-600'
                        }`}
                    >
                        👥 Followers ({filteredFollowers.length})
                    </button>
                </div>

                {/* Following List */}
                {activeTab === 'following' && (
                    <div className="space-y-4">
                        {filteredFollowing.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h2 className="text-2xl font-bold text-gray-800">Not following anyone</h2>
                            </div>
                        ) : (
                            filteredFollowing.map((user) => (
                                <div key={user._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {user.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">{user.username}</h3>
                                                <p className="text-gray-600">{user.email}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {user.followers?.length || 0} followers • {user.following?.length || 0} following
                                                </p>
                                            </div>
                                        </div>
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition">
                                            Unfollow
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Followers List */}
                {activeTab === 'followers' && (
                    <div className="space-y-4">
                        {filteredFollowers.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="text-6xl mb-4">📭</div>
                                <h2 className="text-2xl font-bold text-gray-800">No followers yet</h2>
                            </div>
                        ) : (
                            filteredFollowers.map((user) => (
                                <div key={user._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {user.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">{user.username}</h3>
                                                <p className="text-gray-600">{user.email}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {user.followers?.length || 0} followers • {user.following?.length || 0} following
                                                </p>
                                            </div>
                                        </div>
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                                            Follow Back
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FollowsPage
