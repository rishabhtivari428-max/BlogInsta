import blogInstnace from '../api/blogs.Instance'

export async function createBlog(title, content){
    const response = await blogInstnace.post('/create', {
        title, 
        content 
    })
    return response.data
}

export async function getBlogs(){
    const response = await blogInstnace.get('/getall')
    return response.data
}

export async function searchBlogs(query){
    const response = await blogInstnace.get('/search', {
        params: { query }
    })
    return response.data
}

export async function updateBlog(id, title, content){
    const response = await blogInstnace.patch(`/update/${id}`, { title, content })
    return response.data
}

export async function deleteBlog(id){
    const response = await blogInstnace.delete(`/delete/${id}`)
    return response.data
}

export async function likeBlog(id){
    const response = await blogInstnace.post(`/like/${id}`)
    return response.data
}

export async function dislikeBlog(id){
    const response = await blogInstnace.delete(`/dislike/${id}`)
    return response.data
}

export async function getAllLikes(id){
    const response = await blogInstnace.get(`/getalllikes/${id}`)
    return response.data
}

export async function addComment(id, content){
    const response = await blogInstnace.post(`/addcomment/${id}`, { content })
    return response.data
}

export async function deleteComment(id){
    const response = await blogInstnace.delete(`/deletecomment/${id}`)
    return response.data
}

export async function getComments(id){
    const response = await blogInstnace.get(`/getcomments/${id}`)
    return response.data
}