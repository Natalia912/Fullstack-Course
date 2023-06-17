import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import blogService from "../services/blogs"
import userService from "../services/users"
import { useMutation, useQueryClient } from "react-query"
import UserContext from "../store/userContext"


const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)
  const [isRemovable, setIsRemovable] = useState(false)
  const { user } = useContext(UserContext)

  const toggleOpen = () => { setOpen(prev => !prev) }

  const queryClient = useQueryClient()
  const blogUpdateMutation = useMutation(blogService.updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs")
    }
  })
  const blogDeleteMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs")
    }
  })



  const handleLike = () => {
    const blogData = {
      ...blog,
      likes: blog.likes + 1
    }
    blogUpdateMutation.mutate(blogData)
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}"`)) {
      blogDeleteMutation.mutate(blog.id)
    }
  }

  useEffect(() => {
    if (user) {
      userService.users().then(data => {
        const userInfo = data.find(user => user.name === user?.name)
        if (userInfo?.id === blog.user) {
          setIsRemovable(true)
        }
      })
    }
  }, [user?.name, blog.user])

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
          {user && <button onClick={handleLike} className="likeButton">like</button>}
        </p>
        <p>author: {blog.author}</p>
        {user && <button style={removeStyles} onClick={removeBlog} className="remove-btn">remove</button>}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object,
}

export default Blog