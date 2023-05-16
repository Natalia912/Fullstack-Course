import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loggedUser, setLoggedUser] = useState(null)

  const [notification, setNotification] = useState({
    message: '',
    isSuccess: false
  })

  const notificationPopup = (message, isSuccess) => {
    setNotification({
      message,
      isSuccess
    })
    setTimeout(() => {setNotification({
      message: '',
      isSuccess: false
    })}, 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
      blogService.setToken(user.token)
      notificationPopup(`Welcome, ${user.name}`, true)
    }

  }, [])

  const logOut = () => {
    window.localStorage.removeItem('user')
    setLoggedUser(null)
    notificationPopup('You have successfully logged out', true)
  }

  let notificationColor = notification.isSuccess ? 'green' : 'red'
  let notificationStyle = {
    color: notificationColor,
    border: `2px solid ${notificationColor}`,
    width: '50%',
    padding: '10px 20px'
  }

  return (
    <div>
      {notification.message && <p style={notificationStyle}>{notification.message}</p>}
      {!loggedUser && <Login setLoggedUser={setLoggedUser} notificationPopup={notificationPopup} />}
      <h2>blogs</h2>
      {loggedUser && (
        <div>
          <p style={{display: 'inline-block'}}>{loggedUser.username} logged in</p>
          <button onClick={logOut}>Logout</button>
          <Togglable label="new note">
            <NewBlogForm setBlogs={setBlogs} notificationPopup={notificationPopup} />
          </Togglable>
        </div>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App