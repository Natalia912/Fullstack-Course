import { createSlice } from "@reduxjs/toolkit"

import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlogState(state, action) {
      const filteredBlog = state.filter(blog => blog.id !== action.payload.id)
      if (action.payload.data) {
        return [...filteredBlog, action.payload.data]
      }
      return filteredBlog
    }
  }
})

export const { setBlogs, appendBlog, updateBlogState } = blogsSlice.actions

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sorted))
  }
}

export const addNewBlog = (blog) => {
  return async dispatch => {
    const result = await blogService.postNewBlog(blog)
    if (result) {
      dispatch(appendBlog(result))
    }
  }
}

export const updateBlog = (id, data) => {
  return async dispatch => {
    await blogService.updateBlog(id, data)
    dispatch(updateBlogState({ id, data }))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(updateBlogState({ id }))
  }
}

export default blogsSlice.reducer