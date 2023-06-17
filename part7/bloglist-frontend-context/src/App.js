import { useEffect, useContext } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"
import NotificationContext from "./store/notificationContext"
import { useQuery } from "react-query"
import UserContext from "./store/userContext"

const App = () => {

  const { user, userDispatch } = useContext(UserContext)
  const { notification, notificationPopup } = useContext(NotificationContext)

  const { isLoading, data } = useQuery("blogs", blogService.getAll)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: "SET", payload: loggedUser })
      blogService.setToken(user.token)
      notificationPopup(`Welcome, ${user.name}`, true)
    }

  }, [])

  const logOut = () => {
    window.localStorage.removeItem("user")
    userDispatch({ type: "UNSET" })
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
      {!user && <Login />}
      <h2>blogs</h2>
      {user && (
        <div>
          <p style={{ display: "inline-block" }}>{user.username} logged in</p>
          <button onClick={logOut} className="logout">Logout</button>
          <Togglable label="new blog">
            <NewBlogForm />
          </Togglable>
        </div>
      )}
      { isLoading && <p>blogs are loading</p>}
      {data && [...data]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App