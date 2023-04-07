const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany()
  let newBlog = new Blog(helper.initialBlogs[0])
  await newBlog.save()
  newBlog = new Blog(helper.initialBlogs[1])
  await newBlog.save()
})

// test('the amount of blog posts is ?', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.status).toBe(200)
//   expect(response.type).toBe(/application\/json/)

//   expect(response.body).toHaveLength(helper.initialBlogs.length)
// })

test('blog defines _id as an id', async () => {
  const blogs = await api.get('/api/blogs')

  blogs.body.map(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('adding a new blog to the database', async () => {
  const newBlog = {
    title: "New blog",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  const blogsTitles = response.body.map(blog => blog.title)
  expect(blogsTitles).toContain(newBlog.title)
})