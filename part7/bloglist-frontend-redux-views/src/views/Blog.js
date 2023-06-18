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
  }

  if (!blog) {
    return <p>blog not found</p>
  }

  return (

    <div className="moreInfo bg-slate-200 p-4 w-max">
      <p className="text-lg">url: {blog.url}</p>
      <p className="likes text-lg">likes: {blog.likes}
        {loggedUser && <button onClick={handleLike} className="likeButton bg-green-900 text-white rounded-sm px-3 hover:text-green-900 hover:bg-slate-200 ml-4">like</button>}
      </p>
      <p className="text-lg">author: {blog.author}</p>
      {loggedUser && <button style={removeStyles} onClick={removeBlog} className="remove-btn capitalize w-full bg-red-700 text-white rounded-sm px-2 py-1 mt-2">remove</button>}

      <p className="text-lg font-bold my-2">comments</p>
      <input className="p-2 border-2 border-green-900 mr-2" type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
      <button onClick={handleComment} className="bg-green-900 text-white p-2 hover:text-green-900 hover:bg-white border-2 border-green-900">add comment</button>
      <ul>
        {blog.comments?.map((com, i) => <li className="bg-white p-2 mt-2" key={`${com + i}`}>{com}</li>)}
      </ul>
    </div>
  )}


export default Blog