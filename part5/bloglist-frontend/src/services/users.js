import axios from "axios"

const users = () => {
  const usersData = axios.get('/api/users')

  return usersData.then(res => res.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {users}