const User = require('../models/user')

const initialBlogs = [
  {
    title: 'first',
    author: 'firstAu',
    url: 'firstAu.com',
    likes: 1
  },
  {
    title: 'second',
    author: 'secondAu',
    url: 'secondAu.com',
    likes: 2
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {initialBlogs, usersInDb}