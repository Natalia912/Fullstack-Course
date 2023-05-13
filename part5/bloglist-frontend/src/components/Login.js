import { useState } from "react"
import loginUser from "../services/login"
import blogServices from '../services/blogs'

const Login = ({ setLoggedUser, notificationPopup}) => {

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
        setLoggedUser(data)
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
      <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start'}}>
        <label>
          <span>username</span>
          <input type="text" value={user.username} autoComplete='off' onChange={(e) => handleChange(e, 'username')} />
        </label>
        <label>
          <span>password</span>
          <input type="password" value={user.password} autoComplete='off' onChange={(e) => handleChange(e, 'password')}/>
        </label>
        <button onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </>
  )
}

export default Login