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
      <h2 className="text-xl capitalize font-bold my-4">{user?.name}</h2>
      <h3 className="text-lg capitalize font-bold my-4">added blogs</h3>
      <ul className="bg-slate-200 p-4 w-max min-w-[300px]">
        {user?.blogs.map(item => <li className="list-decimal list-inside" key={item.id}>{item.title}</li>)}
      </ul>
    </>
  )
}

export default User