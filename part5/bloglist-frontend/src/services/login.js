import axios from 'axios'

const baseUrl = '/api/login'

const loginUser = (user) => {
  const request = axios.post(baseUrl, {username: user.username, password: user.password})

  return request.then(res => res.data)
}

export default loginUser