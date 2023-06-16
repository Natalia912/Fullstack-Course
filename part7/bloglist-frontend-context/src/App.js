import { useState, useEffect, useContext } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"
import NotificationContext from "./store/notificationContext"
import BlogContext from "./store/blogContext"

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)

  const { blogs, blogsDispatch } = useContext(BlogContext)
  const { notification, notificationPopup } = useContext(NotificationContext)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      blogsDispatch({ type: "SET_BLOGS", payload: blogs })
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
      blogService.setToken(user.token)
      notificationPopup(`Welcome, ${user.name}`, true)
    }

  }, [])

  const logOut = () => {
    window.localStorage.removeItem("user")
    setLoggedUser(null)
    notificationPopup("You have successfully logged out", true)
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
            <NewBlogForm />
          </Togglable>
        </div>
      )}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
        )}
    </div>
  )
}

export default App