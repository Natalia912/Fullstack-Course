const { v1: uuid } = require('uuid')
const { ApolloServer } = require('@apollo/server')
const { books, authors } = require('./data')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
const Author = require('./mongoose/author')
const Book = require('./mongoose/book')
const { GraphQLError } = require('graphql')
const User = require('./mongoose/user')
const jwt = require('jsonwebtoken')
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book]!,
    allAuthors: [Author]!,
    me: User
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
    ) : Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({author: args.author, genres: { $all: [args.genre] }})
     
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      const booksOf = books.filter(book => book.author === root.name)
      return booksOf.length
    }
  },
  Mutation: {
    addBook: (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const newBook = new Book({...args, id: uuid()})
      try {newBook.save()}
      catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const toEdit = await Author.findOne({name: args.name})
      if (!toEdit) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      toEdit.born = args.setBornTo
      try {
       toEdit.save()
      }
       catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
       }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = {server}