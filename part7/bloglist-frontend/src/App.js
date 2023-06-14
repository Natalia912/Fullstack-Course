import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { notificationPopup } from "./store/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loggedUser, setLoggedUser] = useState(null)

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  // notification slice isn't working

  console.log(notification)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
      blogService.setToken(user.token)
      dispatch(notificationPopup(`Welcome, ${user.name}`, true))
    }

  }, [])

  const logOut = () => {
    window.localStorage.removeItem("user")
    setLoggedUser(null)
    dispatch(notificationPopup("You have successfully logged out", true))
  }

  let notificationColor = notification.isSuccess ? "green" : "red"
  let notificationStyle = {
    color: notificationColor,
    border: `2px solid ${notificationColor}`,
    width: "50%",
    padding: "10px 20px"
  }

  return (
    <div>
      {notification.message && <p style={notificationStyle} id="notification">{notification.message}</p>}
      {!loggedUser && <Login setLoggedUser={setLoggedUser} />}
      <h2>blogs</h2>
      {loggedUser && (
        <div>
          <p style={{ display: "inline-block" }}>{loggedUser.username} logged in</p>
          <button onClick={logOut} className="logout">Logout</button>
          <Togglable label="new blog">
            <NewBlogForm setBlogs={setBlogs} />
          </Togglable>
        </div>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={loggedUser} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App