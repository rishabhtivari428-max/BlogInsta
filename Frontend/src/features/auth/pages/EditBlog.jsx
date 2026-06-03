import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog, getBlogs } from '../services/blog.api'

const EditBlog = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true)
                const response = await getBlogs()
                const blogToEdit = response.blogs?.find((b) => b._id === id)
                if(blogToEdit){
                    setTitle(blogToEdit.title)
                    setContent(blogToEdit.content)
                } else {
                    setErrors({ submit: "Blog not found" })
                }
            } catch (error) {
                setErrors({ submit: "Failed to load blog" })
                console.log("Error fetching blog:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [id])

    const validateForm = () => {
        const newErrors = {}
        if (!title.trim()) newErrors.title = "Title is required"
        if (!content.trim()) newErrors.content = "Content is required"
        else if (content.length < 50) newErrors.content = "Content must be at least 50 characters"
        return newErrors
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newErrors = validateForm()
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setIsSubmitting(true)
        try {
            await updateBlog(id, title, content)
            navigate('/dashboard')
        } catch (error) {
            console.log("Error while editing blog:", error)
            setErrors({ submit: error.response?.data?.message || "Failed to update blog" })
            setIsSubmitting(false)
        }
    }

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    <p className="mt-4 text-white text-lg font-medium">Loading blog...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8">
                        <h1 className="text-4xl font-bold text-white mb-2">✏️ Edit Your Blog</h1>
                        <p className="text-indigo-100">Update your content</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {errors.submit && (
                            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                                <p className='text-red-700 text-sm font-medium'>{errors.submit}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Blog Title
                                </label>
                                <input 
                                    id="title"
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter blog title..."
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                                        errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                    }`}
                                />
                                {errors.title && (
                                    <p className='text-red-600 text-xs mt-1 font-medium'>{errors.title}</p>
                                )}
                            </div>

                            {/* Content Field */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Blog Content
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Update your story..."
                                    rows="10"
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-none ${
                                        errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                    }`}
                                />
                                {errors.content && (
                                    <p className='text-red-600 text-xs mt-1 font-medium'>{errors.content}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">{content.length} characters</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <button 
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95'
                                >
                                    {isSubmitting ? "Saving..." : "💾 Save Changes"}
                                </button>
                                <button 
                                    type='button'
                                    onClick={() => navigate('/dashboard')}
                                    className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBlog