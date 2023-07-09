import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      id,
      bookCount,
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      id,
      published,
      author
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]! ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title,
      published,
      author,
      genres,
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name,
      born,
      id
    }
  }
`