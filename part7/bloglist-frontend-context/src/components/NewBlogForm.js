import { useContext, useState } from "react"
import blogServices from "../services/blogs"
import NotificationContext from "../store/notificationContext"
import BlogContext from "../store/blogContext"

const NewBlogForm = () => {

  const { notificationPopup } = useContext(NotificationContext)
  const { blogsDispatch } = useContext(BlogContext)

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
      notificationPopup("Please fill out all the fields", false)
    } else {
      blogServices.postNewBlog(blog).then(data => {
        blogsDispatch({ type: "ADD_BLOG", payload: data })
        setBlog({
          title: "",
          author: "",
          url: ""
        })
        notificationPopup(`a new blog ${data.title} by ${data.author}`, true)
      }).catch(error => {
        notificationPopup(error, false)
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