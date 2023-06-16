import { useEffect, useState, useContext } from "react"
import PropTypes from "prop-types"
import blogService from "../services/blogs"
import userService from "../services/users"
import BlogContext from "../store/blogContext"


const Blog = ({ blog, loggedUser }) => {
  const [open, setOpen] = useState(false)
  const [isRemovable, setIsRemovable] = useState(false)
  const toggleOpen = () => { setOpen(prev => !prev) }

  const { blogsDispatch } = useContext(BlogContext)


  const handleLike = () => {
    const blogData = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.updateBlog(blog.id, blogData).then(() => {
      blogsDispatch({ type: "UPDATE_BLOG", payload: blogData })
    })

  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}"`)) {
      blogService.deleteBlog(blog.id).then(() => {
        blogsDispatch({ type: "DELETE_BLOG", payload: { id: blog.id } })
      })
    }
  }

  useEffect(() => {
    if (loggedUser) {
      userService.users().then(data => {
        const userInfo = data.find(user => user.name === loggedUser?.name)
        if (userInfo?.id === blog.user) {
          setIsRemovable(true)
        }
      })
    }
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
    <div style={blogStyles} className="blog">
      <div>
        <p>{blog.title} {blog.author} <button className="toggleView" onClick={toggleOpen}>{open ? "hide" : "view"}</button></p>
      </div>
      <div className="moreInfo" style={{ display: open ? "" : "none" }}>
        <p>url: {blog.url}</p>
        <p className="likes">likes: {blog.likes}
          {loggedUser && <button onClick={handleLike} className="likeButton">like</button>}
        </p>
        <p>author: {blog.author}</p>
        {loggedUser && <button style={removeStyles} onClick={removeBlog} className="remove-btn">remove</button>}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object,
}

export default Blog