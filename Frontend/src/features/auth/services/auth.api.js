import axiosInstance from '../api/axiosInstance'

export async function registerUser(username, email, password){
    const response = await axiosInstance.post('/auth/register', {
        username, 
        email,
        password
    })
    return response.data
}

export async function loginUser(username, email, password){
    const response = await axiosInstance.post('/auth/login', {
        username,
        email, 
        password
    })
    return response.data
}

export async function getMe(){
    const response = await axiosInstance.get('/auth/getUser')
    return response.data
}

export async function logoutUser(){
    const response = await axiosInstance.post('/auth/logout')
    return response.data
}