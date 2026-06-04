import { createContext } from "react";
import { createBlog, getBlogs, updateBlog, deleteBlog } from '../services/blog.api'
import { useState, useEffect, useCallback } from "react";

export const blogContext = createContext()

export function BlogProvider({ children }){
    const [blogs, setblogs] = useState([])
    const [loading, setloading] = useState(false)

    const fetchBlogs = useCallback(async () => {
        setloading(true)
        try {
            const response = await getBlogs()
            setblogs(response.blogs || []) // ✅ correct key
        } catch (error) {
            console.log("Unable to fetch blogs: ", error)
        } finally {
            setloading(false)
        }
    }, [])

    const addBlog = async(title, content) => {
        const response = await createBlog(title, content)
        if(response.blog){
            setblogs(prev => [...prev, response.blog])
        }
    }

    const editBlog = async(id, title, content) => {
        const response = await updateBlog(id, title, content)
        if(response.blog){
            setblogs(prev => prev.map(b => b._id === id ? response.blog : b))
        }
    }

    const removeBlog = async(id) => {
        await deleteBlog(id)
        setblogs(prev => prev.filter(b => b._id !== id)) // ✅ update state
    }

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    return (
        <blogContext.Provider value={{ blogs, addBlog, editBlog, removeBlog, fetchBlogs, loading }}>
            { children }
        </blogContext.Provider>
    )
}