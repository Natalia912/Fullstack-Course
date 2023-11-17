const { v1: uuid } = require('uuid')
const { ApolloServer } = require('@apollo/server')
const { books, authors } = require('./data')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
const Author = require('./mongoose/author')
const Book = require('./mongoose/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int,
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!
    id: ID!,
    genres: [String]!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book]!,
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String,
      genres: [String]!
    ) : Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({author: args.author, genres: { $all: [args.genre] }})
     
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      const booksOf = books.filter(book => book.author === root.name)
      return booksOf.length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = new Book({...args, id: uuid()})
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const toEdit = await Author.findOne({name: args.name})
      toEdit.born = args.setBornTo
      return toEdit.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = {server}