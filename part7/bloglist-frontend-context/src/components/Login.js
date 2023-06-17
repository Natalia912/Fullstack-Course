import { useContext, useState } from "react"
import loginUser from "../services/login"
import blogServices from "../services/blogs"
import NotificationContext from "../store/notificationContext"
import UserContext from "../store/userContext"

const Login = () => {

  const { notificationPopup } = useContext(NotificationContext)
  const { userDispatch } = useContext(UserContext)

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e, inputName) => {
    setUser(prev => ({
      ...prev,
      [inputName]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user.username || !user.password) {
      notificationPopup("Please fill out all the fields", false)
    } else {
      loginUser(user).then(data => {
        userDispatch({ type: "SET", payload: data })
        blogServices.setToken(data.token)
        window.localStorage.setItem("user", JSON.stringify(data))
        notificationPopup(`Welcome, ${user.username}`, true)
      }).catch(() => {
        notificationPopup("invalid username or password", false)
      })

      setUser({
        username: "",
        password: ""
      })
    }
  }
  return (
    <>
      <h2>Log in to application</h2>
      <form autoComplete='off' style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
        <label>
          <span>username</span>
          <input
            id="username"
            type="text"
            value={user.username}
            autoComplete='off'
            onChange={(e) => handleChange(e, "username")}
          />
        </label>
        <label>
          <span>password</span>
          <input
            id="password"
            type="password"
            value={user.password}
            autoComplete='off'
            onChange={(e) => handleChange(e, "password")}
          />
        </label>
        <button id="login-btn" onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </>
  )
}

export default Login