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

const authorWithMostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  const count = blogs.reduce((accumulator, value) => {
    accumulator[value.author] = ++accumulator[value.author] || 1;

    return accumulator;
  }, {});

  const maxBlogs = Math.max(...Object.values(count))
  const author = Object.keys(count).find(key => count[key] === maxBlogs)

  return {
    author,
    blogs: maxBlogs
  }
}

const authorWithMostLikes = (blogs) => {

  if (blogs.length === 0) return null

  const count = blogs.reduce((accumulator, value) => {
    accumulator[value.author] = accumulator[value.author] + value.likes || value.likes;
    return accumulator;
  }, {});


  const maxLikes = Math.max(...Object.values(count))
  const author = Object.keys(count).find(key => count[key] === maxLikes)

  return {
    author,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}