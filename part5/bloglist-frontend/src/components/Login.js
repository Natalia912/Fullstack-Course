import { useState } from "react"
import loginUser from "../services/login"

const Login = ({loggedUser, setLoggedUser}) => {

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
    loginUser(user).then(data => {
      setLoggedUser(data)
      window.localStorage.setItem("user", JSON.stringify(data))
    }).catch(error => {
      console.log(error)
    })

    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <>
      <h2>Log in to application</h2>
      <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start'}}>
        <label>
          <span>username</span>
          <input type="text" value={user.username} onChange={(e) => handleChange(e, 'username')} />
        </label>
        <label>
          <span>password</span>
          <input type="password" value={user.password} onChange={(e) => handleChange(e, 'password')}/>
        </label>
        <button onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </>
  )
}

export default Login