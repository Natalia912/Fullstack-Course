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
      <h2 className="text-xl capitalize font-bold my-4">Log in to application</h2>
      <form className="flex flex-col gap-3 items-start mb-2 bg-slate-200 p-4 w-[300px]" autoComplete='off'>
        <label className="flex justify-between w-full">
          <p className="capitalize mr-2">username</p>
          <input
            id="username"
            type="text"
            value={user.username}
            autoComplete='off'
            onChange={(e) => handleChange(e, "username")}
          />
        </label>
        <label className="flex justify-between w-full">
          <p className="capitalize mr-2">password</p>
          <input
            id="password"
            type="password"
            value={user.password}
            autoComplete='off'
            onChange={(e) => handleChange(e, "password")}
          />
        </label>
        <button className="bg-green-900 text-white p-2 hover:text-green-900 hover:bg-white border-2 border-green-900 w-full" id="login-btn" onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </>
  )
}

export default Login