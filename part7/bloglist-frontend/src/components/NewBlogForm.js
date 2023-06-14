import { useState } from "react"
import blogServices from "../services/blogs"
import { useDispatch } from "react-redux"
import { notificationPopup } from "../store/notificationReducer"

const NewBlogForm = ({ setBlogs }) => {

  const dispatch = useDispatch()

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: ""
  })

  const handleChange = (e, inputName) => {
    setBlog(prev => ({
      ...prev,
      [inputName]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!blog.title || !blog.author || !blog.url) {
      dispatch(notificationPopup("Please fill out all the fields", false))
    } else {
      blogServices.postNewBlog(blog).then(data => {
        setBlogs(prev => ([...prev, data]))
        setBlog({
          title: "",
          author: "",
          url: ""
        })
        dispatch(notificationPopup(`a new blog ${data.title} by ${data.author}`, true))
      }).catch(error => {
        dispatch(notificationPopup(error, false))
      })
    }
  }

  return (
    <>
      <h2>create new blog</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}
        onSubmit={(e) => handleSubmit(e) }
      >
        <label>
          <span>title</span>
          <input type="text" id="title-input" value={blog.title} onChange={(e) => handleChange(e, "title")} />
        </label>
        <label>
          <span>author</span>
          <input type="text" id="author-input" value={blog.author} onChange={(e) => handleChange(e, "author")} />
        </label>
        <label>
          <span>url</span>
          <input type="text" id="url-input" value={blog.url} onChange={(e) => handleChange(e, "url")} />
        </label>
        <button type='submit' id="submit-btn">Create</button>
      </form>
    </>
  )
}

export default NewBlogForm