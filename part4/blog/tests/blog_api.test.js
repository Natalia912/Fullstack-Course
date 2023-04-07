const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany()
  let newBlog = new Blog(initialBlogs[0])
  await newBlog.save()
  newBlog = new Blog(initialBlogs[1])
  await newBlog.save()
})

test('the amount of blog posts is ?', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application\/json')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog defines _id as an id', async () => {
  const blogs = await api.get('/api/blogs')

  blogs.body.map(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
  await mongoose.connection.close()
})