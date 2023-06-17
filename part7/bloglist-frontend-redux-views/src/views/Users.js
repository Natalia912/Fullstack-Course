import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../store/usersReducer"
const Users = () => {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.name}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users