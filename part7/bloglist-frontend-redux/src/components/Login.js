import { useState } from "react"
import { useDispatch } from "react-redux"
import { notificationPopup } from "../store/notificationReducer"
import { loginUserFunction } from "../store/userReducer"

const Login = () => {

  const dispatch = useDispatch()

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
      dispatch(notificationPopup("Please fill out all the fields", false))
    } else {
      dispatch(loginUserFunction(user))
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