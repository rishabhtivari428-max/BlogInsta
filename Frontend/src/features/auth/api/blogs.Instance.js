import axios from 'axios'

const blogInstance = axios.create({
    baseURL: 'https://blogapp-hxox.onrender.com/api/v1/blogs',
    withCredentials: true  
})

blogInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default blogInstance