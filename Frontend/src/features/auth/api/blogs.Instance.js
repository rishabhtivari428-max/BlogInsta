import axios from 'axios'

const blogInstance = axios.create({
    baseURL: 'https://blogapp-hxox.onrender.com/api/v1/blogs',
    withCredentials: true  
})

export default blogInstance