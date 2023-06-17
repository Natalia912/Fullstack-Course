import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {

  const users = useSelector(state => state.users)
  const { userId } = useParams()
  const [user, setUser] =  useState(null)

  useEffect(() => {
    const currentUser = users?.find(item => item.id === userId)
    setUser(currentUser)
  }, [])

  if (!user) {
    return <p>user is not found</p>
  }

  return (
    <>
      <h2>{user?.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user?.blogs.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  )
}

export default User