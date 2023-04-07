const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

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
  
  const blog = new Blog(requestContent)

  const result = await blog.save()
      
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