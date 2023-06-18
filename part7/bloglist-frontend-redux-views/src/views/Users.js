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
      <h2 className="text-xl capitalize font-bold my-4">Users</h2>
      <table className="bg-slate-200 w-[400px] h-[200px]">
        <thead>
          <tr>
            <th></th>
            <th className="text-center p-2">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.name}>
              <td className="px-2 text-green-950 underline">
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td className="px-2 text-center">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users