const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((prev, current) => prev + current.likes, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)

  return favorite ? favorite : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}