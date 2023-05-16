import { useEffect, useState } from "react"
import blogService from "../services/blogs"
import userService from "../services/users"

const Blog = ({blog, loggedUser, blogs, setBlogs}) => {
  const [open, setOpen] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(blog.likes)
  const [isRemovable, setIsRemovable] = useState(false)
  
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

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}"`)) {
      blogService.deleteBlog(blog.id).then(() => {
        const filteredBlogs = blogs.filter(item => item.id !== blog.id)
        setBlogs(filteredBlogs)
      })
    }
  }

  useEffect(() => {

    userService.users().then(data => { 
      const userInfo = data.find(user => user.name === loggedUser?.name)
      if (userInfo?.id === blog.user) {
        setIsRemovable(true)
      }
    })     
  }, [loggedUser?.name, blog.user])

  const blogStyles = {
    border: "1px solid black",
    padding: "1rem",
    marginBottom: "1rem",
  }

  const removeStyles = {
    display: isRemovable ? "" : "none",
    backgroundColor: "red",
    color: "white",
    borderRadius: "10px",
    padding: "5px 10px",
    marginTop: "10px",
    cursor: "pointer"
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
      <button style={removeStyles} onClick={removeBlog}>remove</button>
    </div>
  </div>  
)}

export default Blog