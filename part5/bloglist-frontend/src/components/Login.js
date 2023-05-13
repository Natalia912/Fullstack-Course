import loginUser from "../services/login"

const Login = ({user, setUser}) => {

  const handleChange = (e, inputName) => {
    setUser(prev => ({
      ...prev,
      [inputName]: e.target.value 
    }))
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(user).then(data => {
      setUser(prev => ({
        ...prev,
        token: data.token
      }))
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