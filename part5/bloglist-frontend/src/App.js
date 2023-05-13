import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loggedUser, setLoggedUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('user')
    setLoggedUser(null)
  }

  return (
    <div>
      {!loggedUser && <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}
      <h2>blogs</h2>
      {loggedUser && (
        <div>
          <p>{loggedUser.username} logged in</p>
          <button onClick={logOut}>Logout</button>
        </div>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App