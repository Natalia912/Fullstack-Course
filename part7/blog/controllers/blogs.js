const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../middleware/userExtractor')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {

  let requestContent = request.body

  const user = request.user

  if (!requestContent.likes) {
    requestContent.likes = 0
  }

  if (!requestContent.title || !requestContent.url) {
    return response.status(400).end()
  } 
  
  const blog = new Blog({
    title: requestContent.title,
    author: requestContent.author,
    url: requestContent.url,
    likes: requestContent.likes,
    comments: ["an awesome article"],
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
      
  response.status(201).json(result)
})


blogRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!user) {
    return response.status(400).json({error: "user is not found"})
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  return response.status(401).json({error: 'user is invalid'})

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