const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  
  if (!request.token) {
    return response.status(401).json({error: "unauthorized"})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({error: 'token is invalid'})
  }

  request.user = await User.findById(decodedToken.id)

  next()
}

module.exports = userExtractor