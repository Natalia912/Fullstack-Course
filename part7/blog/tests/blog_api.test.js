const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let token = null


beforeEach(async () => {
  await User.deleteMany({})

  const newUser = {
    username: "root",
    name: "root",
    password: "secret"
  }

  let newUserResponse = await api
    .post('/api/users')
    .send(newUser)

  let response = await api.post('/api/login').send(newUser)
  token = response.body.token

  await Blog.deleteMany()

  const blogsObj = helper.initialBlogs.map(blog => new Blog({...blog, user: newUserResponse.body.id}))
  const savedBlogs = blogsObj.map(sb => sb.save())

  await Promise.all(savedBlogs)

})

describe('testing initially saved notes', () => {

  test('the amount of blog posts is 2', async () => {
    const response = await api.get('/api/blogs')

    expect(response.status).toBe(200)
    expect(response.type).toMatch(/application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog defines _id as an id', async () => {
    const blogs = await api.get('/api/blogs')

    blogs.body.map(blog => expect(blog.id).toBeDefined())
  })
})

describe('testing post requests', () => {

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
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const blogsTitles = response.body.map(blog => blog.title)
    expect(blogsTitles).toContain(newBlog.title)
  })

  test('if request is missing likes property then it defaults to 0', async () => {
    const withoutLikes = {
      title: "Blog Without Likes",
      author: "Robert Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    await api
      .post('/api/blogs')
      .send(withoutLikes)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === withoutLikes.title)
    expect(addedBlog.likes).toEqual(0)
  })

  test('request body is missing title', async () => {
    const withoutTitle = {
      author: "wt Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(withoutTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('request body is missing url', async () => {
    const withoutUrl = {
      title: 'without Url',
      author: "wt Robert C. Martin",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(withoutUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('user is unauthorized', async () => {
    const blog = {
      title: 'without Url',
      author: "wt Robert C. Martin",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })
})

describe('test delete method', () => {
  test('deleting a blog by id', async () => {

    const response = await api.get('/api/blogs')

    const id = response.body.find(blog => blog.id).id

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const newResponse = await api.get('/api/blogs')
    
    expect(newResponse.body).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('test put method', () => {
  test('updating a blog by id', async () => {

    const response = await api.get('/api/blogs')

    const blogToUpdate = response.body[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newResponse = await api.get('/api/blogs')

    const theBlog = newResponse.body.find(b => b.id === blogToUpdate.id)
    
    expect(newResponse.body).toHaveLength(helper.initialBlogs.length)
    expect(theBlog.likes).toEqual(blogToUpdate.likes + 1)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})

