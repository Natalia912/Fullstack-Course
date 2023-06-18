import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import userService from "../services/users"
import { updateBlog, deleteBlog } from "../store/blogsReducer"

const Blog = () => {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)

  const [isRemovable, setIsRemovable] = useState(false)
  const [blog, setBlog] = useState(null)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    const blogData = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(blog.id, blogData))
  }

  const handleComment = () => {
    const blogData = {
      ...blog,
      comments: blog.comments ? [...blog.comments, newComment] : [newComment]
    }
    dispatch(updateBlog(blog.id, blogData))
    setNewComment("")
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}"`)) {
      dispatch(deleteBlog(blog.id))
      navigate("/")
    }
  }

  useEffect(() => {
    const currentBlog = blogs.find(item => item.id === blogId)
    setBlog(currentBlog)
  }, [blogs])

  useEffect(() => {
    if (loggedUser) {
      userService.users().then(data => {
        const userInfo = data.find(user => user.name === loggedUser.name)
        if (userInfo?.id === blog?.user) {
          setIsRemovable(true)
        }
      })
    }
  }, [loggedUser?.name, blog?.user])


  const removeStyles = {
    display: isRemovable ? "" : "none",
    backgroundColor: "red",
    color: "white",
    borderRadius: "10px",
    padding: "5px 10px",
    marginTop: "10px",
    cursor: "pointer"
  }

  if (!blog) {
    return <p>blog not found</p>
  }

  return (

    <div className="moreInfo">
      <p>url: {blog.url}</p>
      <p className="likes">likes: {blog.likes}
        {loggedUser && <button onClick={handleLike} className="likeButton">like</button>}
      </p>
      <p>author: {blog.author}</p>
      {loggedUser && <button style={removeStyles} onClick={removeBlog} className="remove-btn">remove</button>}

      <p>comments</p>
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog.comments?.map((com, i) => <li key={`${com + i}`}>{com}</li>)}
      </ul>
    </div>
  )}


export default Blog