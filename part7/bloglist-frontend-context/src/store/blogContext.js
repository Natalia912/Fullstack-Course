import { createContext, useReducer } from "react"

const BlogContext = createContext()

const blogsReducer = (state, action) => {
  switch(action.type) {
  case "SET_BLOGS":
    return action.payload
  case "ADD_BLOG":
    return [...state, action.payload]
  case "UPDATE_BLOG": {
    const id = action.payload.id
    const updatedBlog = action.payload
    const filtered =  state.filter(blog => blog.id !== id)
    return [...filtered, updatedBlog]
  }
  case "DELETE_BLOG":
    return state.filter(blog => blog.id !== action.payload.id)
  default:
    return state
  }
}

export const BlogContextProvider = ({ children }) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])
  return (
    <BlogContext.Provider value={{ blogs, blogsDispatch }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext