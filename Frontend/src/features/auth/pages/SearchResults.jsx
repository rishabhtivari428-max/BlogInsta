import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchBlogs } from '../services/blog.api'

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (query.trim()) {
            fetchSearchResults()
        }
    }, [query])

    const fetchSearchResults = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await searchBlogs(query)
            setResults(response.blogs || [])
        } catch (err) {
            setError('Failed to fetch search results')
            console.error('Search error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-700 text-lg font-medium">Searching...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Results</h1>
                    <p className="text-lg text-gray-600">
                        {query && `Results for "${query}"`}
                    </p>
                </div>

                {error && (
                    <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-red-700 text-sm font-medium'>{error}</p>
                    </div>
                )}

                {results.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">No results found</h2>
                        <p className="text-gray-600">
                            {query ? `No blogs found matching "${query}". Try different keywords.` : 'Enter search terms to find blogs.'}
                        </p>
                        <Link to="/home" className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-gray-600 mb-6 font-medium">
                            Found {results.length} {results.length === 1 ? 'blog' : 'blogs'}
                        </div>

                        {results.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden">
                                <div className="p-6 md:p-8">
                                    {/* Blog Header */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition">
                                                {blog.title}
                                            </h2>
                                            {blog.author && (
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                        {blog.author.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-gray-600 font-medium">{blog.author.username}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Blog Content Preview */}
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {blog.content}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex gap-4">
                                            <span>
                                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span>•</span>
                                            <span>{blog.content.length} characters</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchResults
