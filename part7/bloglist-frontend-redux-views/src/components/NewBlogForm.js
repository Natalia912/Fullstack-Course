import { useState } from "react"
import { useDispatch } from "react-redux"
import { notificationPopup } from "../store/notificationReducer"
import { addNewBlog } from "../store/blogsReducer"

const NewBlogForm = () => {

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
      dispatch(addNewBlog(blog))
      setBlog({
        title: "",
        author: "",
        url: ""
      })
      dispatch(notificationPopup(`a new blog ${blog.title} by ${blog.author}`, true))
    }
  }

  return (
    <>
      <h2 className="text-xl capitalize font-bold my-2">create new blog</h2>
      <form
        onSubmit={(e) => handleSubmit(e) }
        className="flex flex-col gap-3 items-start mb-2 bg-slate-200 p-4 w-[300px]"
      >
        <label className="flex justify-between w-full">
          <p className="capitalize mr-2">title</p>
          <input type="text" id="title-input" value={blog.title} onChange={(e) => handleChange(e, "title")} />
        </label>
        <label className="flex justify-between w-full">
          <p className="capitalize mr-2">author</p>
          <input type="text" id="author-input" value={blog.author} onChange={(e) => handleChange(e, "author")} />
        </label>
        <label className="flex justify-between w-full">
          <p className="capitalize mr-2">url</p>
          <input type="text" id="url-input" value={blog.url} onChange={(e) => handleChange(e, "url")} />
        </label>
        <button type='submit' id="submit-btn" className="bg-green-900 text-white p-2 hover:text-green-900 hover:bg-white border-2 border-green-900 w-full">Create</button>
      </form>
    </>
  )
}

export default NewBlogForm