const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  let requestContent = request.body

  if (!requestContent.likes) {
    requestContent.likes = 0
  }

  if (!requestContent.title || !requestContent.url) {
    return response.status(400).end()
  } 

  const user = await User.findById(requestContent.userId)
  
  const blog = new Blog({
    title: requestContent.title,
    author: requestContent.author,
    url: requestContent.url,
    likes: requestContent.likes,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
      
  response.status(201).json(result)
})


blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

  const bodyReq = request.body

  const updatedBlog = {
    ...bodyReq
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})
  response.json(updatedBlog)

})

module.exports = blogRouter