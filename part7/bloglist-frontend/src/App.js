import { useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from "./store/blogsReducer"
import { getUserFromLocalStorage, logOutUser } from "./store/userReducer"

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getUserFromLocalStorage())
  }, [])

  const logOut = () => {
    dispatch(logOutUser())
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
      {!loggedUser && <Login />}
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