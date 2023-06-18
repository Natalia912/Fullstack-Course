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

  const notificationStyleSuccess = "border-green-600 text-green-600"
  const notificationStyleFail = "border-red-600 text-red-600"

  return (
    <div>
      <nav className="flex gap-6 px-10 py-6 justify-between bg-gray-200 mb-12">
        <ul className="list-none flex gap-4 align-middle">
          <li className="text-blue-900 hover:text-red-900 text-lg capitalize self-center">
            <Link to="/">blogs</Link>
          </li>
          <li className="text-blue-900 hover:text-red-900 text-lg capitalize self-center">
            <Link to="users">users</Link>
          </li>
        </ul>
        {loggedUser && (
          <div>
            <p className="inline-block mr-4">{loggedUser.username} logged in</p>
            <button onClick={logOut} className="border-solid border-2 border-black py-2 px-4 hover:bg-black hover:text-white">Logout</button>
          </div>
        )}
      </nav>
      <main className="px-10">
        {notification.message && <p className={`border-2 w-[50%] px-6 py-2 ${notification.isSuccess ? notificationStyleSuccess : notificationStyleFail}`} id="notification">{notification.message}</p>}
        {!loggedUser && <Login />}
        <h2 className="text-2xl capitalize font-bold my-6">blogs</h2>

        <Outlet />
      </main>
    </div>
  )
}

export default App