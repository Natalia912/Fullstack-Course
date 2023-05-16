import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
  const [open, setOpen] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(blog.likes)
  const toggleOpen = () => { setOpen(prev => !prev) }

  const handleLike = () => {
    const blogData = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.updateBlog(blog.id, blogData).then(data => {
      setCurrentLikes(prev => prev + 1)
    })
  }

  const blogStyles = {
    border: "1px solid black",
    padding: "1rem",
    marginBottom: "1rem",
  }
  return (
  <div style={blogStyles}>
    <div>
      <p>{blog.title} {blog.author} <button onClick={toggleOpen}>{open ? "hide" : "view"}</button></p>
    </div>
    <div style={{display: open ? "" : "none"}}>
      <p>url: {blog.url}</p>
      <p>likes: {currentLikes} <button onClick={handleLike}>like</button></p>
      <p>author: {blog.author}</p>
    </div>
  </div>  
)}

export default Blog