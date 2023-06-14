import axios from "axios"

const users = () => {
  const usersData = axios.get("/api/users")

  return usersData.then(res => res.data)
}


export default { users }