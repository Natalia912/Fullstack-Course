const testingRouter = require('express').Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const { response } = require('../app')

testingRouter.post("/reset", async(req, res) => {
  await User.deleteMany()
  await Blog.deleteMany()

  res.status(204).end()
})

module.exports = testingRouter