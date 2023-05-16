import { useState } from "react"

const Blog = ({blog}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => { setOpen(prev => !prev) }

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
      <p>likes: {blog.likes} <button>like</button></p>
      <p>author: {blog.author}</p>
    </div>
  </div>  
)}

export default Blog