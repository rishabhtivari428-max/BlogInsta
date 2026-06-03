import axios from 'axios'

const blogInstnace = axios.create({
    baseURL: "http://localhost:3000/api/blogs",
    withCredentials: true
})

export default blogInstnace