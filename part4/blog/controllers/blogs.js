const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {

  let requestContent = request.body
  if (!requestContent.likes) {
    requestContent.likes = 0
  }

  if (!requestContent.title || !requestContent.url) {
    return response.status(400).end()
  } 
  
  const blog = new Blog(requestContent)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter