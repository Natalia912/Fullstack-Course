import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = (blogData) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, blogData, config)

  return request.then(res => res.data)
}

const updateBlog = (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${blogData.id}`, blogData, config)
  return request.then(res => res.data)
}

const deleteBlog = (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${blogId}`, config)

  return request
}

export default { getAll, postNewBlog, setToken, updateBlog, deleteBlog }