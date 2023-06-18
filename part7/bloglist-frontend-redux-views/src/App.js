import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from "./store/blogsReducer"
import { getUserFromLocalStorage, logOutUser } from "./store/userReducer"

const App = () => {
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
      <nav>
        <ul>
          <li>
            <Link to="/">blogs</Link>
          </li>
          <li>
            <Link to="users">users</Link>
          </li>
        </ul>
        {loggedUser && (
          <div>
            <p style={{ display: "inline-block" }}>{loggedUser.username} logged in</p>
            <button onClick={logOut} className="logout">Logout</button>
          </div>
        )}
      </nav>
      {notification.message && <p style={notificationStyle} id="notification">{notification.message}</p>}
      {!loggedUser && <Login />}
      <h2>blogs</h2>

      <Outlet />
    </div>
  )
}

export default App